//福彩3D 排列3
import * as bettings from './betting-constants'

import * as examples from './examples'

const select_three_direct_duplex = 
[
    bettings.bai_wei_obj,
    bettings.shi_wei_obj,
    bettings.ge_wei_obj,
]

const select_three_group_suplex = 
[
    {
        type : "groupThree",
        values : {
            types : bettings.group_three,
            vulues: bettings.numbers_0_9,
            actions: bettings.actions_six_type,
        }
    },
]

const select_three_group_six_duplex =
[
    {
        type : "groupSix",
        values : {
            types : bettings.group_six,
            vulues: bettings.numbers_0_9,
            actions: bettings.actions_six_type,
        }
    },
]

const select_three_not_location_three = 
[
    {
        type : "not_location",
        values : {
            types : bettings.not_location_title,
            vulues: bettings.numbers_0_9,
            actions: bettings.actions_six_type,
        }
    },
]

const select_three_direct_sum_three =
[
    {
        type : "sum",
        values : {
            types : bettings.sum_value,
            vulues: bettings.numbers_0_27,
            actions: [],
        }
    },
]

const select_three_direct_two_last_direct_duplex = 
[
    bettings.shi_wei_obj,
    bettings.ge_wei_obj,
]

const select_three_direct_two_first_direct_duplex = 
[
   
    bettings.bai_wei_obj,
    bettings.shi_wei_obj,
]

const select_three_direct_one_last_direct = 
[
    bettings.ge_wei_obj,
]

const select_three_direct_one_first_direct = 
[
    bettings.bai_wei_obj,
]

export default {
    exapmleAndHelp : {
        select_three_direct: {
            'select_three_direct_duplex' : examples.select_three_direct_duplex,
            'select_three_direct_single' : examples.select_three_direct_single,
        },
        select_three_group: {
            'select_three_group_suplex' : examples.select_three_group_suplex,
            'select_three_group_single' : examples.select_three_group_single,
            'select_three_group_six_duplex' : examples.select_three_group_six_duplex,
            'select_three_group_six_single' : examples.select_three_group_six_single,
        },
        select_three_not_location: {
            'select_three_not_location_three' : examples.select_three_not_location_three,
        },
        select_three_direct_sum: {
            'select_three_direct_sum_three' : examples.select_three_direct_sum_three,
        },
        select_three_direct_two: {
            'select_three_direct_two_last_direct_duplex' : examples.select_three_direct_two_last_direct_duplex,
            'select_three_direct_two_last_direct_single' : examples.select_three_direct_two_last_direct_single,
            'select_three_direct_two_first_direct_duplex' : examples.select_three_direct_two_first_direct_duplex,
            'select_three_direct_two_first_direct_single' : examples.select_three_direct_two_first_direct_single,
        },
        select_three_direct_one: {
            'select_three_direct_one_last_direct' : examples.select_three_direct_one_last_direct,
            'select_three_direct_one_first_direct' : examples.select_three_direct_one_first_direct,
        },
    },
    playMethod : [
        bettings.select_three_direct,
        bettings.select_three_group,
        bettings.select_three_not_location,
        bettings.select_three_direct_sum,
        bettings.select_three_direct_two,
        bettings.select_three_direct_one,
    ],
    methodType : {
        select_three_direct:[
            {
                name : '',
                desc : '',
                items : [bettings.select_three_direct_duplex, bettings.select_three_direct_single],
                selectPlate : {
                    'select_three_direct_duplex' : select_three_direct_duplex,
                    'select_three_direct_single' : "singlePlate",
                }
            },
        ],
        select_three_group:[
            {
                name : '',
                desc : '',
                items : [bettings.select_three_group_suplex, bettings.select_three_group_single,
                         bettings.select_three_group_six_duplex, bettings.select_three_group_six_single],
                selectPlate : {
                    'select_three_group_suplex' : select_three_group_suplex,
                    'select_three_group_single' : "singlePlate",
                    'select_three_group_six_duplex' : select_three_group_six_duplex,
                    'select_three_group_six_single' : "singlePlate",
                }
            },
        ],
        select_three_not_location:[
            {
                name : '',
                desc : '',
                items : [bettings.select_three_not_location_three ],
                selectPlate : {
                    'select_three_not_location_three' : select_three_not_location_three,
                }
            },
        ],
        select_three_direct_sum:[
            {
                name : '',
                desc : '',
                items : [bettings.select_three_direct_sum_three],
                selectPlate : {
                    'select_three_direct_sum_three' : select_three_direct_sum_three,
                }
            },
        ],
        select_three_direct_two:[
            {
                name : '',
                desc : '',
                items : [bettings.select_three_direct_two_first_direct_duplex, bettings.select_three_direct_two_first_direct_single,
                         bettings.select_three_direct_two_last_direct_duplex, bettings.select_three_direct_two_last_direct_single],
                selectPlate : {
                    'select_three_direct_two_last_direct_duplex' : select_three_direct_two_last_direct_duplex,
                    'select_three_direct_two_last_direct_single' : "singlePlate",
                    'select_three_direct_two_first_direct_duplex' : select_three_direct_two_first_direct_duplex,
                    'select_three_direct_two_first_direct_single' : "singlePlate",
                }
            },
        ],
        select_three_direct_one:[
            {
                name : '',
                desc : '',
                items : [bettings.select_three_direct_one_first_direct, bettings.select_three_direct_one_last_direct],
                selectPlate : {
                    'select_three_direct_one_last_direct' : select_three_direct_one_last_direct,
                    'select_three_direct_one_first_direct' : select_three_direct_one_first_direct,
                }
            },
        ],
    }
}