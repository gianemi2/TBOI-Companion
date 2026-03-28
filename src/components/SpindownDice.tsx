import { getCachedItems } from '@/lib/fetchItems';
import { Item } from '@/types/item';
import { useMemo, useState } from 'react';

interface Props {
    item: Item
}

function getNearbyIds(id: number, items: Item[], range = 8) {
    const prev = [];
    const next = [];

    for (let i = 1; i <= range; i++) {
        prev.push(items.find(_ => _.index === id - i));
        next.push(items.find(_ => _.index === id + i));
    }

    return { prev, next };
}

export const SpindownDice = ({ item }: Props) => {
    const [data] = useState(() => getCachedItems());

    if (!data)
        return;

    const { items } = data;
    const { prev, next } = useMemo(() => getNearbyIds(item.index, items), [item])
    return (
        <div className='flex gap-2 flex-col overflow-x-scroll'>

            <div className="flex gap-2 overflow-x-auto ">
                {(next && next.length > 0) && next.map(nextItem => {
                    if (!nextItem)
                        return
                    return (
                        <div
                            className="w-8 h-8 bg-no-repeat scale-200"
                            style={{
                                backgroundImage: `${nextItem.bg ? nextItem.bg : "url(/isaac.png)"}`,
                                backgroundPosition: `${nextItem.bg ? "" : `-${nextItem.index * 32}px 0px`}`,
                                backgroundSize: `${nextItem.bg ? "contain" : "38688px 32px"}`
                            }
                            }
                        />
                    )
                })}
            </div>
            <div
                className="w-8 h-8 bg-no-repeat scale-200"
                style={{
                    backgroundImage: `${item.bg ? item.bg : "url(/isaac.png)"}`,
                    backgroundPosition: `${item.bg ? "" : `-${item.index * 32}px 0px`}`,
                    backgroundSize: `${item.bg ? "contain" : "38688px 32px"}`
                }
                }
            />
            <div className="flex gap-2 overflow-x-scroll flex-nowrap">
                {(prev && prev.length > 0) && prev.map(prevItem => {
                    if (!prevItem)
                        return;
                    return (
                        <div
                            className="w-8 h-8 bg-no-repeat scale-200"
                            style={{
                                backgroundImage: `${prevItem.bg ? prevItem.bg : "url(/isaac.png)"}`,
                                backgroundPosition: `${prevItem.bg ? "" : `-${prevItem.index * 32}px 0px`}`,
                                backgroundSize: `${prevItem.bg ? "contain" : "38688px 32px"}`
                            }
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}
