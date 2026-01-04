import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputPath = path.resolve(__dirname, "../data/milestones.md")
const outputPath = path.resolve(__dirname, "../data/milestones.json")

const raw = fs.readFileSync(inputPath, "utf-8")
const lines = raw.split("\n")

const result = []

let currentSection = null
let currentMilestone = null

function flushMilestone() {
  if (
    currentSection &&
    currentMilestone &&
    currentMilestone.title &&
    currentMilestone.description.trim()
  ) {
    currentSection.milestones.push({
      title: currentMilestone.title,
      unlock: currentMilestone.unlock,
      description: currentMilestone.description.trim(),
    })
  }
  currentMilestone = null
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim()

  if (!line) continue

  // ===== SEZIONE =====
  if (line.startsWith("# ") && !line.startsWith("## ")) {
    flushMilestone()

    currentSection = {
      milestoneTitle: line.replace("# ", "").trim(),
      milestones: [],
    }

    result.push(currentSection)
    continue
  }

  // ===== MILESTONE =====
  if (line.startsWith("## ")) {
    flushMilestone()

    const content = line.replace("## ", "").trim()
    const match = content.match(/^(.+?)\s*\((.+?)\)$/)

    currentMilestone = {
      title: match ? match[1].trim() : content,
      unlock: match ? match[2].trim() : "",
      description: "",
    }
    continue
  }

  // ===== DESCRIZIONE =====
  if (currentMilestone) {
    currentMilestone.description +=
      (currentMilestone.description ? "\n\n" : "") + line
  }
}

flushMilestone()

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))
console.log("✅ milestones.json generato correttamente")
