export function CainQualityTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-md overflow-hidden text-sm">
                <thead className="bg-muted">
                    <tr>
                        <th className="px-3 py-2 text-left font-semibold">
                            Item quality
                        </th>
                        <th className="px-3 py-2 text-left font-semibold">
                            Pickup sum
                        </th>
                        <th className="px-3 py-2 text-left font-semibold">
                            Special pool
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-border">
                    <tr>
                        <td className="px-3 py-2">0 – 1</td>
                        <td className="px-3 py-2">0 – 8</td>
                        <td className="px-3 py-2">0 – 13</td>
                    </tr>
                    <tr>
                        <td className="px-3 py-2">0 – 2</td>
                        <td className="px-3 py-2">9 – 14</td>
                        <td className="px-3 py-2">14 – 19</td>
                    </tr>
                    <tr>
                        <td className="px-3 py-2">1 – 2</td>
                        <td className="px-3 py-2">15 – 18</td>
                        <td className="px-3 py-2">20 – 23</td>
                    </tr>
                    <tr>
                        <td className="px-3 py-2">2 – 3</td>
                        <td className="px-3 py-2">19 – 22</td>
                        <td className="px-3 py-2">24 – 27</td>
                    </tr>
                    <tr>
                        <td className="px-3 py-2">2 – 4</td>
                        <td className="px-3 py-2">23 – 26</td>
                        <td className="px-3 py-2">28 – 31</td>
                    </tr>
                    <tr>
                        <td className="px-3 py-2">3 – 4</td>
                        <td className="px-3 py-2">27 – 34</td>
                        <td className="px-3 py-2">32 – 39</td>
                    </tr>
                    <tr className="bg-accent">
                        <td className="px-3 py-2 font-semibold">4</td>
                        <td className="px-3 py-2 font-semibold">35+</td>
                        <td className="px-3 py-2 font-semibold">40+</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
