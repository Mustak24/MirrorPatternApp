export type PatternInfo = {
    id: Patterns,
    name: string,
    size: [1 | 2, 1 | 2],
    pattern: Array<Array<{x: boolean, y: boolean}>>
}

export type Patterns = (
    '2T-1' | '2T-2' | '2T-3' | '2T-4' | '4T-1' | '4T-2' | '4T-3' | '4T-4'
);


export default {
    '2T-1': {
        id: '2T-1',
        name: 'Flip on Right',
        size: [1, 2],
        pattern: [
            [
                {x: false, y: false},
                {x: false, y: true}
            ]
        ]
    },

    "2T-2": {
        id: '2T-2',
        name: "Flip on Left",
        size: [1, 2],
        pattern: [
            [
                {x: false, y: true},
                {x: false, y: false}
            ]
        ]
    },

    "2T-3": {
        id: '2T-3',
        name: "Flip on Bottom",
        size: [2, 1],
        pattern: [
            [
                {x: false, y: false},
            ],
            [
                {x: true, y: false}
            ]
        ]
    },

    "2T-4": {
        id: '2T-4',
        name: "Flip on Top",
        size: [2, 1],
        pattern: [
            [
                {x: true, y: false},
            ],
            [
                {x: false, y: false}
            ]
        ]
    },

    '4T-1': {
        id: '4T-1',
        name: 'Flip on Right and Bottom',
        size: [2, 2],
        pattern: [
            [
                {x: false, y: false},
                {x: false, y: true}
            ],
            [
                {x: true, y: false},
                {x: true, y: true}
            ]
        ]
    },

    '4T-2': {
        id: '4T-2',
        name: 'Flip on Left and Top',
        size: [2, 2],
        pattern: [
            [
                { x: true, y: true },
                { x: true, y: false },
            ],
            [
                { x: false, y: true },
                { x: false, y: false },
            ]
        ]
    },

    '4T-3': {
        id: '4T-3',
        name: 'Flip on Left and Bottom',
        size: [2, 2],
        pattern: [
            [
                { x: false, y: true },
                { x: false, y: false },
            ],
            [
                { x: true, y: true },
                { x: true, y: false },
            ]
        ],
    },

    '4T-4': {
        id: '4T-4',
        name: 'Flip on Right and Top',
        size: [2, 2],
        pattern: [
            [
                { x: true, y: false },
                { x: true, y: true },
            ],
            [
                { x: false, y: false },
                { x: false, y: true },
            ]
        ],
    },
} as Record<Patterns, PatternInfo>