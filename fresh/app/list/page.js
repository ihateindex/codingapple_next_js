'use client';

import { useState } from 'react';

export default function List() {
    let 상품 = ['Tomatoes', 'Pasta', 'Coconut'];
    let [수량, 수량변경] = useState([0, 0, 0]);
    return (
        <div>
            <h4 className="title">상품목록</h4>
            {상품.map((item, index) => {
                return (
                    <div className="food" key={index}>
                        <img src={`/food${index}.png`} alt="" className="food-img" />
                        <h4>{item} $40</h4>
                        <button
                            onClick={() => {
                                수량변경((prevState) => {
                                    let copy = [...prevState];
                                    copy[index]--;
                                    return copy;
                                });
                            }}
                        >
                            -
                        </button>
                        <span> {수량[index]} </span>
                        <button
                            onClick={() => {
                                수량변경((prevState) => {
                                    let copy = [...prevState];
                                    copy[index]++;
                                    return copy;
                                });
                            }}
                        >
                            +
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
