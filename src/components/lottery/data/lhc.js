//香港六合彩
import * as bettings from './betting-constants'

export default {
    exapmleAndHelp : {
        lhc_tm: {
            'lhc_tm_type' : "",
        },
        lhc_zm: {
            'lhc_zm_type' : "",
        },
        lhc_zmt: {
            'lhc_zmt_one' : "",
            'lhc_zmt_two' : "",
            'lhc_zmt_three' : "",
            'lhc_zmt_four' : "",
            'lhc_zmt_five' : "",
            'lhc_zmt_six' : "",
        },
        lhc_tmsx: {
            'lhc_tmsx_type' : "",
        },
        lhc_tmdxds: {
            'lhc_tmdxds_type' : "",
        },
        lhc_tmsb: {
            'lhc_tmsb_type' : "",
        },
    },
    playMethod : [
        bettings.lhc_tm,
        bettings.lhc_zm,
        bettings.lhc_zmt,
        bettings.lhc_tmsx,
        bettings.lhc_tmdxds,
        bettings.lhc_tmsb,
    ],
    methodType : {
        lhc_tm : [
            {
                name : 'lhc_tm',
                desc : '特码',
                items : [bettings.lhc_tm_type],
                selectPlate : {
                    'lhc_tm_type' : "",
                }
            },
        ],
        lhc_zm : [
            {
                name : 'lhc_zm',
                desc : '正码',
                items : [bettings.lhc_zm_type],
                selectPlate : {
                    'lhc_zm_type' : "",
                }
            },
        ],
        lhc_zmt : [
            {
                name : 'lhc_zmt',
                desc : '正码特',
                items : [bettings.lhc_zmt_one,bettings.lhc_zmt_two,bettings.lhc_zmt_three,
                            bettings.lhc_zmt_four,bettings.lhc_zmt_five,bettings.lhc_zmt_six],
                selectPlate : {
                    'lhc_zmt_one' : "",
                    'lhc_zmt_two' : "",
                    'lhc_zmt_three' : "",
                    'lhc_zmt_four' : "",
                    'lhc_zmt_five' : "",
                    'lhc_zmt_six' : "",
                }
            },
        ],
        lhc_tmsx : [
            {
                name : 'lhc_tmsx',
                desc : '特码生肖',
                items : [bettings.lhc_tmsx_type],
                selectPlate : {
                    'lhc_tmsx_type' : "",
                }
            },
        ],
        lhc_tmdxds : [
            {
                name : 'lhc_tmdxds',
                desc : '特码大小单双',
                items : [bettings.lhc_tmdxds_type],
                selectPlate : {
                    'lhc_tmdxds_type' : "",
                }
            },
        ],
        lhc_tmsb : [
            {
                name : 'lhc_tmsb',
                desc : '特码色波',
                items : [bettings.lhc_tmsb_type],
                selectPlate : {
                    'lhc_tmsb_type' : "",
                }
            },
        ],
    }
}