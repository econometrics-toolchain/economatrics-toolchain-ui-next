import { useState } from "react";
import { SpreadSheet } from "../spreadsheet/sheet/Sheet";

export const Demo = ({ regCallback }) => {
    const [demoData, setDemoData] = useState({
        data: [
            [
                {
                    "value": "",
                    "readOnly": true
                },
                {
                    "value": "y",
                    "readOnly": true
                },
                {
                    "value": "x",
                    "readOnly": true
                },
                {
                    "value": "C",
                    "readOnly": true
                },
                {
                    "value": "D",
                    "readOnly": true
                },
                {
                    "value": "E",
                    "readOnly": true
                },
                {
                    "value": "F",
                    "readOnly": true
                },
                {
                    "value": "G",
                    "readOnly": true
                },
                {
                    "value": "H",
                    "readOnly": true
                },
                {
                    "value": "I",
                    "readOnly": true
                }
            ],
            [
                {
                    "value": 1,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "234"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 2,
                    "readOnly": true
                },
                {
                    "value": "42"
                },
                {
                    "value": "23"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 3,
                    "readOnly": true
                },
                {
                    "value": "34"
                },
                {
                    "value": "423"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 4,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "234"
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                },
                {
                    "value": ""
                }
            ],
            [
                {
                    "value": 5,
                    "readOnly": true
                },
                {
                    "value": "42"
                },
                {
                    "value": "23"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 6,
                    "readOnly": true
                },
                {
                    "value": "34"
                },
                {
                    "value": "423"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 7,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "234"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 8,
                    "readOnly": true
                },
                {
                    "value": "42"
                },
                {
                    "value": "23"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 9,
                    "readOnly": true
                },
                {
                    "value": "34"
                },
                {
                    "value": "423"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ],
            [
                {
                    "value": 10,
                    "readOnly": true
                },
                {
                    "value": "23"
                },
                {
                    "value": "4"
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {}
            ]
        ], tools: [
            "KMNK",
            "DurbinWatson",
            "GoldfeldQuandt",
            "HarrisonMcCabe",
            "JarqueBer"
        ], outputs: [
            {
                "output_data": {
                    "a0": 361.68301886792455,
                    "a1": -4.915094339622642
                },
                "tool_handle": "KMNK"
            },
            {
                "output_data": {
                    "expl": "Wystepuje autokorelacja dodatnia",
                    "DW_coefficient": 2.8709512356876643
                },
                "tool_handle": "DurbinWatson"
            },
            {
                "output_data": {
                    "F": 4.9503,
                    "GQ": 2.076889588300213,
                    "expl": "Wystepuje homoskedastycznosc"
                },
                "tool_handle": "GoldfeldQuandt"
            },
            {
                "output_data": {
                    "b": 0.32500353727428904,
                    "bL": 0.11073583965450418,
                    "bU": 0.30124111338715504,
                    "expl": "Wystepuje homoskedastycznosc"
                },
                "tool_handle": "HarrisonMcCabe"
            },
            {
                "output_data": {
                    "X": 5.991465,
                    "JB": 0.8281040655366467,
                    "expl": "Skladnik losowy ma rozklad normalny"
                },
                "tool_handle": "JarqueBer"
            }
        ]
    });

    const handleDeleteSpreadsheet = (pk) => {
    }

    const handleOnChange = (data, tools, outputs, pk) => {
        regCallback()
        // setDemoData({ data: data, tools: tools, outputs: outputs })
    }
    return (
        <div className="demo-sheet">
            <SpreadSheet
                pk={0}
                data={demoData.data}
                tools={demoData.tools}
                outputs={demoData.outputs}
                onDeleteSpreadsheet={handleDeleteSpreadsheet}
                onChange={handleOnChange}
            />
        </div>
    );
}

