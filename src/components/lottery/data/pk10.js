//北京赛车PK10
import * as bettings from './betting-constants'

import * as examples from './examples'

const pk10_guess_one_duplex =
[
    {
        type : "guess_one",
        values : {
            types : bettings.guess_one,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
]

const pk10_guess_one_two_duplex =
[
    ...pk10_guess_one_duplex,
    {
        type : "guess_two",
        values : {
            types : bettings.guess_two,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
]

const pk10_guess_first_three_duplex = 
[
    ...pk10_guess_one_two_duplex,
    {
        type : "guess_three",
        values : {
            types : bettings.guess_three,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },

]

const pk10_guess_location_one_five =
[
    {
        type : "guess_1",
        values : {
            types : bettings.guess_1,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_2",
        values : {
            types : bettings.guess_2,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_3",
        values : {
            types : bettings.guess_3,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_4",
        values : {
            types : bettings.guess_4,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_5",
        values : {
            types : bettings.guess_5,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
]

const pk10_guess_location_six_ten =
[
    {
        type : "guess_6",
        values : {
            types : bettings.guess_6,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_7",
        values : {
            types : bettings.guess_7,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_8",
        values : {
            types : bettings.guess_8,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_9",
        values : {
            types : bettings.guess_9,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
    {
        type : "guess_10",
        values : {
            types : bettings.guess_10,
            vulues: bettings.numbers_01_10,
            actions: bettings.actions_six_type,
        }
    },
]

const pk10_guess_daxiao_one = 
[
    {
        type : "guess_1_c",
        values : {
            types : bettings.guess_1_c,
            vulues: bettings.numbers_da_xiao,
            actions: [],
        }
    },
]

const pk10_guess_daxiao_two =
[
    {
        type : "guess_2_c",
        values : {
            types : bettings.guess_2_c,
            vulues: bettings.numbers_da_xiao,
            actions: [],
        }
    },
]

const pk10_guess_daxiao_three =
[
    {
        type : "guess_3_c",
        values : {
            types : bettings.guess_3_c,
            vulues: bettings.numbers_da_xiao,
            actions: [],
        }
    },
]

const pk10_guess_danshuang_one =
[
    {
        type : "guess_1_c",
        values : {
            types : bettings.guess_1_c,
            vulues: bettings.numbers_dan_shuang,
            actions: [],
        }
    },
]

const pk10_guess_danshuang_two =
[
    {
        type : "guess_2_c",
        values : {
            types : bettings.guess_2_c,
            vulues: bettings.numbers_dan_shuang,
            actions: [],
        }
    },
]

const pk10_guess_danshuang_three =
[
    {
        type : "guess_3_c",
        values : {
            types : bettings.guess_3_c,
            vulues: bettings.numbers_dan_shuang,
            actions: [],
        }
    },
]


export default {
    exapmleAndHelp : {
        pk10_guess_one: {
            'pk10_guess_one_duplex': examples.pk10_guess_one_duplex,
        },
        pk10_guess_one_two: {
            'pk10_guess_one_two_duplex' : examples.pk10_guess_one_two_duplex,
            'pk10_guess_one_two_single' : examples.pk10_guess_one_two_single,
        },
        pk10_guess_first_three: {
            'pk10_guess_first_three_duplex' : examples.pk10_guess_first_three_duplex,
            'pk10_guess_first_three_single' : examples.pk10_guess_first_three_single,
        },
        pk10_guess_location: {
            'pk10_guess_location_one_five' : examples.pk10_guess_location_one_five,
            'pk10_guess_location_six_ten' : examples.pk10_guess_location_six_ten,
        },
        pk10_guess_daxiao: {
            'pk10_guess_daxiao_one' : examples.pk10_guess_daxiao_one,
            'pk10_guess_daxiao_two' : examples.pk10_guess_daxiao_two,
            'pk10_guess_daxiao_three' : examples.pk10_guess_daxiao_three,
        },
        pk10_guess_danshuang: {
            'pk10_guess_danshuang_one' : examples.pk10_guess_danshuang_one,
            'pk10_guess_danshuang_two' : examples.pk10_guess_danshuang_two,
            'pk10_guess_danshuang_three' : examples.pk10_guess_danshuang_three,
        },
    },
    playMethod : [
        bettings.pk10_guess_one,
        bettings.pk10_guess_one_two,
        bettings.pk10_guess_first_three,
        bettings.pk10_guess_location,
        bettings.pk10_guess_daxiao,
        bettings.pk10_guess_danshuang,
    ],
    methodType : {
        pk10_guess_one : [
            {
                name : 'pk10_guess_one',
                desc : '猜冠军',
                items : [bettings.pk10_guess_one_duplex],
                selectPlate : {
                    'pk10_guess_one_duplex' : pk10_guess_one_duplex,
                }
            },
        ],
        pk10_guess_one_two : [
            {
                name : 'pk10_guess_one_two',
                desc : '猜冠亚军',
                items : [bettings.pk10_guess_one_two_duplex, bettings.pk10_guess_one_two_single],
                selectPlate : {
                    'pk10_guess_one_two_duplex' : pk10_guess_one_two_duplex,
                    'pk10_guess_one_two_single' : "singlePlate",
                }
            },
        ],
        pk10_guess_first_three : [
            {
                name : 'pk10_guess_first_three',
                desc : '猜前三名',
                items : [bettings.pk10_guess_first_three_duplex, bettings.pk10_guess_first_three_single],
                selectPlate : {
                    'pk10_guess_first_three_duplex' : pk10_guess_first_three_duplex,
                    'pk10_guess_first_three_single' : "singlePlate",
                }
            },
        ],
        pk10_guess_location : [
            {
                name : 'pk10_guess_location',
                desc : '定位胆',
                items : [bettings.pk10_guess_location_one_five, bettings.pk10_guess_location_six_ten],
                selectPlate : {
                    'pk10_guess_location_one_five' : pk10_guess_location_one_five,
                    'pk10_guess_location_six_ten' : pk10_guess_location_six_ten,
                }
            },
        ],
        pk10_guess_daxiao : [
            {
                name : 'pk10_guess_daxiao',
                desc : '大小',
                items : [bettings.pk10_guess_daxiao_one, bettings.pk10_guess_daxiao_two, bettings.pk10_guess_daxiao_three],
                selectPlate : {
                    'pk10_guess_daxiao_one' : pk10_guess_daxiao_one,
                    'pk10_guess_daxiao_two' : pk10_guess_daxiao_two,
                    'pk10_guess_daxiao_three' : pk10_guess_daxiao_three,
                }
            },
        ],
        pk10_guess_danshuang : [
            {
                name : 'pk10_guess_danshuang',
                desc : '单双',
                items : [bettings.pk10_guess_danshuang_one, bettings.pk10_guess_danshuang_two, bettings.pk10_guess_danshuang_three],
                selectPlate : {
                    'pk10_guess_danshuang_one' : pk10_guess_danshuang_one,
                    'pk10_guess_danshuang_two' : pk10_guess_danshuang_two,
                    'pk10_guess_danshuang_three' : pk10_guess_danshuang_three,
                }
            },
        ],
    }
}