// 时时彩

import * as bettings from './betting-constants'

import * as examples from './examples'

const five_star_direct_duplex = [
		 bettings.wan_wei_obj,
		 bettings.qian_wei_obj,
		 bettings.bai_wei_obj,
		 bettings.shi_wei_obj,
		 bettings.ge_wei_obj,
	]
const five_star_g120 = [
			{
				type : "g120",
				values : {
					types : [],
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
	]
const five_star_g60 = [
			{
				type : "two_dup",
				values : {
					types : bettings.two_dup,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
			{
				type : "single_no",
				values : {
					types : bettings.single_no,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},

	]

const five_star_g30 = [
			{
				type : "two_dup",
				values : {
					types : bettings.two_dup,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
			{
				type : "single_no",
				values : {
					types : bettings.single_no,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},

	]

const five_star_g20 = [
			{
				type : "three_dup",
				values : {
					types : bettings.three_dup,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
			{
				type : "single_no",
				values : {
					types : bettings.single_no,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},

	]

const five_star_g10 = [
			{
				type : "three_dup",
				values : {
					types : bettings.three_dup,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
			{
				type : "two_dup",
				values : {
					types : bettings.two_dup,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},

	]

	const five_star_g5 = [
			{
				type : "four_dup",
				values : {
					types : bettings.four_dup,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
			{
				type : "single_no",
				values : {
					types : bettings.single_no,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},

	]
//四星
const four_star_first_four = [
		 bettings.wan_wei_obj,
		 bettings.qian_wei_obj,
		 bettings.bai_wei_obj,
		 bettings.shi_wei_obj,
	]

	const four_star_last_four = [
		 bettings.qian_wei_obj,
		 bettings.bai_wei_obj,
		 bettings.shi_wei_obj,
		 bettings.ge_wei_obj,
	]
   const four_star_g24 = [
			{
				type : "g24",
				values : {
					types : [],
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
	]

   const four_star_g6 = [
			{
				type : "two_dup",
				values : {
					types : bettings.two_dup,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
	]

	const first_three_duplex = [
		 bettings.wan_wei_obj,
		 bettings.qian_wei_obj,
		 bettings.bai_wei_obj,
	]

	const first_three_sum = [
			{
				type : "sum",
				values : {
					types : bettings.sum_value,
					vulues: bettings.numbers_0_27,
					actions: [],
				}
			},
	]
	const first_three_three_duplex = [
			{
				type : "groupThree",
				values : {
					types : bettings.group_three,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
	]

	const first_three_six_duplex = [
			{
				type : "groupSix",
				values : {
					types : bettings.group_six,
					vulues: bettings.numbers_0_9,
					actions: bettings.actions_six_type,
				}
			},
	]

	const middle_three_duplex = [
		 bettings.qian_wei_obj,
		 bettings.bai_wei_obj,
		 bettings.shi_wei_obj,
	]

	var middle_three_sum = first_three_sum
	var middle_three_three_duplex = first_three_three_duplex
	var middle_three_six_duplex = first_three_six_duplex

	const last_three_duplex = [
		 bettings.bai_wei_obj,
		 bettings.shi_wei_obj,
		 bettings.ge_wei_obj,
	]

	var last_three_sum = first_three_sum
	var last_three_three_duplex = first_three_three_duplex
	var last_three_six_duplex = first_three_six_duplex

	var any_three_duplex = five_star_direct_duplex
	var any_three_sum = first_three_sum
	var any_three_three_duplex = first_three_three_duplex
	var any_three_six_duplex = first_three_six_duplex

	const first_two_duplex = [
		 bettings.wan_wei_obj,
		 bettings.qian_wei_obj,
	]
	const first_two_sum = [
		{
			type : "sum",
			values : {
				types : bettings.sum_value,
				vulues: bettings.numbers_0_18,
				actions: [],
			}
		},
	]

	const first_two_group_duplex = [
		{
			type : "group_two",
			values : {
				types : bettings.group_two,
				vulues: bettings.numbers_0_9,
				actions: bettings.actions_six_type,
			}
		},
	]

	const last_two_duplex = [
		 bettings.shi_wei_obj,
		 bettings.ge_wei_obj,
	]
	const last_two_sum = first_two_sum

	const last_two_group_duplex = first_two_group_duplex

	const any_two_duplex = five_star_direct_duplex
	const any_two_sum = first_two_sum

	const any_two_group_duplex = first_two_group_duplex

	const location_gall_duplex = five_star_direct_duplex

	const not_location_gall_duplex = [
		{
			type : "not_location",
			values : {
				types : bettings.not_location_title,
				vulues: bettings.numbers_0_9,
				actions: bettings.actions_six_type,
			}
		},
	]

	const big_little_odd_even_first_two_duplex = [
		{
			type : "wan",
			values : {
				types : bettings.wan_wei,
				vulues: bettings.numbers_da_xiao_dan_shuang,
				actions: bettings.action_all_clear,
			}
		},
		{
			type : "qian",
			values : {
				types : bettings.qian_wei,
				vulues: bettings.numbers_da_xiao_dan_shuang,
				actions:bettings. action_all_clear,
			}
		}
	]

	const big_little_odd_even_last_two_duplex = [
		{
			type : "shi",
			values : {
				types : bettings.shi_wei,
				vulues: bettings.numbers_da_xiao_dan_shuang,
				actions:bettings. action_all_clear,
			}
		},
		{
			type : "ge",
			values : {
				types : bettings.ge_wei,
				vulues: bettings.numbers_da_xiao_dan_shuang,
				actions:bettings. action_all_clear,
			}
		},
	]

	const interesting_one_duplex = [
			{
				type : "interesting",
				values : {
					types : bettings.interesting_title,
					vulues: bettings.numbers_0_9,
					actions:bettings. actions_six_type,
				}
			},
	]

	const interesting_two_duplex = interesting_one_duplex
	const interesting_three_duplex = interesting_one_duplex
	const interesting_four_duplex = interesting_one_duplex

export default {
	exapmleAndHelp : {
		five_star : {
			"direct_duplex" : examples.five_star_direct_select_duplex_example,
			"direct_single" : examples.five_star_direct_select_single_example,
			"group_120" : examples.five_star_group_120_example,
			"group_60" : examples.five_star_group_60_example,
			"group_30" : examples.five_star_group_30_example,
			"group_20" : examples.five_star_group_20_example,
			"group_10" : examples.five_star_group_10_example,
			"group_5" : examples.five_star_group_5_example,
		},
		four_star : {
			"direct_first_four_single" : examples.four_star_direct_first_four_single_example,
			"direct_first_four_duplex" : examples.four_star_direct_first_four_duplex_example,
			"direct_last_four_single" : examples.four_star_direct_last_four_single_example,
			"direct_last_four_duplex" : examples.four_star_direct_last_four_duplex_example,
			"group_24" : examples.four_star_group_24_example,
			"group_12" : examples.four_star_group_12_example,
			"group_6" : examples.four_star_group_6_example,
			"group_4" : examples.four_star_group_4_example,
		},
		first_three : {
			'direct_first_three_single' : examples.first_three_single_example,
  			'direct_first_three_duplex' : examples.first_three_duplex_example,
  			'direct_first_three_sum' : examples.first_three_sum_example,
			'group_first_three_three_duplex' : examples.first_three_three_duplex_example,
  			'group_first_three_three_single' : examples.first_three_three_single_example,
  			'group_first_three_six_duplex' : examples.first_three_six_duplex_example,
  			'group_first_three_six_single' : examples.first_three_six_single_example,
  			'group_first_three_mix_single' : examples.first_three_mix_single_example,
		},
		middle_three : {
			'direct_middle_three_single' : examples.middle_three_single_example,
  			'direct_middle_three_duplex' : examples.middle_three_duplex_example,
  			'direct_middle_three_sum' : examples.middle_three_sum_example,
			'group_middle_three_three_duplex' : examples.middle_three_three_duplex_example,
  			'group_middle_three_three_single' : examples.middle_three_three_single_example,
  			'group_middle_three_six_duplex' : examples.middle_three_six_duplex_example,
  			'group_middle_three_six_single' : examples.middle_three_six_single_example,
  			'group_middle_three_mix_single' : examples.middle_three_mix_single_example,
		},
		last_three : {
			'direct_last_three_single' : examples.last_three_single_example,
  			'direct_last_three_duplex' : examples.last_three_duplex_example,
  			'direct_last_three_sum' : examples.last_three_sum_example,
			'group_last_three_three_duplex' : examples.last_three_three_duplex_example,
  			'group_last_three_three_single' : examples.last_three_three_single_example,
  			'group_last_three_six_duplex' : examples.last_three_six_duplex_example,
  			'group_last_three_six_single' : examples.last_three_six_single_example,
  			'group_last_three_mix_single' : examples.last_three_mix_single_example,
		},
		any_three : {
			'direct_any_three_single' : examples.any_three_single_example,
  			'direct_any_three_duplex' : examples.any_three_duplex_example,
  			'direct_any_three_sum' : examples.any_three_sum_example,
			'group_any_three_three_duplex' : examples.any_three_three_duplex_example,
  			'group_any_three_three_single' : examples.any_three_three_single_example,
  			'group_any_three_six_duplex' : examples.any_three_six_duplex_example,
  			'group_any_three_six_single' : examples.any_three_six_single_example,
  			'group_any_three_mix_single' : examples.any_three_mix_single_example,
		},
		first_two : {
			'direct_first_two_single' : examples.first_two_single_example,
  			'direct_first_two_duplex' : examples.first_two_duplex_example,
  			'direct_first_two_sum' :    examples.first_two_sum_example,
			'group_first_two_duplex' :  examples.first_two_group_duplex_example,
  			'group_first_two_single' :  examples.first_two_group_single_example,
		},
		last_two : {
			'direct_last_two_single' : examples.last_two_single_example,
  			'direct_last_two_duplex' : examples.last_two_duplex_example,
  			'direct_last_two_sum' :    examples.last_two_sum_example,
			'group_last_two_duplex' :  examples.last_two_group_duplex_example,
  			'group_last_two_single' :  examples.last_two_group_single_example,
		},
		any_two : {
			'direct_any_two_single' : examples.any_two_single_example,
  			'direct_any_two_duplex' : examples.any_two_duplex_example,
  			'direct_any_two_sum' :    examples.any_two_sum_example,
			'group_any_two_duplex' :  examples.any_two_group_duplex_example,
  			'group_any_two_single' :  examples.any_two_group_single_example,
		},
		location_gall : {
			'location_gall_type' : examples.location_gall_type_example,
		},
		not_location : {
			'not_location_last_three_one_code' : examples.not_location_last_three_one_code_example,
			'not_location_first_three_one_code' : examples.not_location_first_three_one_code_example,
			'not_location_last_three_two_code' : examples.not_location_last_three_two_code_example,
			'not_location_first_three_two_code' : examples.not_location_first_three_two_code_example,
		},
		big_little_odd_even : {
			'big_little_odd_even_first_two' : examples.big_little_odd_even_first_two_example,
			'big_little_odd_even_last_two' : examples.big_little_odd_even_last_two_example,
		},
		interesting : {
			'interesting_one' : examples.interesting_one_example,
			'interesting_two' : examples.interesting_two_example,
			'interesting_three' : examples.interesting_three_example,
			'interesting_four' : examples.interesting_four_example,
		},

	},
	playMethod : [
		 bettings.five_star,
		 bettings.four_star,
		 bettings.first_three,
		 bettings.middle_three,
		 bettings.last_three,
		 bettings.any_three,
		 bettings.first_two,
		 bettings.last_two,
		 bettings.any_two,
		 bettings.location_gall,
		 bettings.not_location,
		 bettings.big_little_odd_even,
		 bettings.interesting,
	],
	methodType : {
		five_star : [
			{
				name : 'direct',
				desc : '五星直选',
				items : [bettings.direct_duplex, bettings.direct_single],
				selectPlate : {
					'direct_single' : "singlePlate",
					'direct_duplex' : five_star_direct_duplex,
				}
			},
			{
				name : 'group',
				desc : '五星组选',
				items : [ bettings.group_120, bettings.group_60, bettings.group_30, bettings.group_20, bettings.group_10, bettings.group_5],
				selectPlate : {
					'group_120' : five_star_g120,
					'group_60' : five_star_g60,
					'group_30' : five_star_g30,
					'group_20' : five_star_g20,
					'group_10' : five_star_g10,
					'group_5' : five_star_g5,
				}
			}
	  	],
	  	four_star : [
		  	{
		  		name : 'direct',
		  		desc : '四星直选',
		  		items : [bettings.first_four_duplex, bettings.first_four_single, bettings.last_four_duplex, bettings.last_four_single],
		  		selectPlate : {
		  			'direct_first_four_single' : "singlePlate",
		  			'direct_first_four_duplex' : four_star_first_four,
		  			'direct_last_four_single' : "singlePlate",
		  			'direct_last_four_duplex' : four_star_last_four,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '四星组选',
		  		items : [ bettings.group_24, bettings.group_12, bettings.group_6, bettings.group_4],
		  		selectPlate : {
		  			'group_24' : four_star_g24,
		  			'group_12' : five_star_g30,
		  			'group_6' : four_star_g6,
		  			'group_4' : five_star_g20,
		  		}
		  	}
	  	],
	  	first_three : [
		  	{
		  		name : 'direct',
		  		desc : '前三直选',
		  		items : [bettings.direct_first_three_duplex, bettings.direct_first_three_single, bettings.direct_first_three_sum ],
		  		selectPlate : {
		  			'direct_first_three_single' : "singlePlate",
		  			'direct_first_three_duplex' : first_three_duplex,
		  			'direct_first_three_sum' : first_three_sum,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '前三组选',
		  		items : [ bettings.group_first_three_three_duplex, bettings.group_first_three_three_single, bettings.group_first_three_six_duplex,
		  					bettings.group_first_three_six_single, bettings.group_first_three_mix_single],
		  		selectPlate : {
		  			'group_first_three_three_duplex' : first_three_three_duplex,
		  			'group_first_three_three_single' : "singlePlate",
		  			'group_first_three_six_duplex' : first_three_six_duplex,
		  			'group_first_three_six_single' : "singlePlate",
		  			'group_first_three_mix_single' : "singlePlate",
		  		}
		  	}
	  	],
	  	middle_three : [
		  	{
		  		name : 'direct',
		  		desc : '中三直选',
		  		items : [bettings.direct_middle_three_duplex, bettings.direct_middle_three_single, bettings.direct_middle_three_sum ],
		  		selectPlate : {
		  			'direct_middle_three_single' : "singlePlate",
		  			'direct_middle_three_duplex' : middle_three_duplex,
		  			'direct_middle_three_sum' : middle_three_sum,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '中三组选',
		  		items : [ bettings.group_middle_three_three_duplex, bettings.group_middle_three_three_single,
		  		          bettings.group_middle_three_six_duplex, bettings.group_middle_three_six_single, bettings.group_middle_three_mix_single],
		  		selectPlate : {
		  			'group_middle_three_three_duplex' : middle_three_three_duplex,
		  			'group_middle_three_three_single' : "singlePlate",
		  			'group_middle_three_six_duplex' : middle_three_six_duplex,
		  			'group_middle_three_six_single' : "singlePlate",
		  			'group_middle_three_mix_single' : "singlePlate",
		  		}
		  	}
	  	],
	  	last_three : [
		  	{
		  		name : 'direct',
		  		desc : '后三直选',
		  		items : [bettings.direct_last_three_duplex, bettings.direct_last_three_single, bettings.direct_last_three_sum ],
		  		selectPlate : {
		  			'direct_last_three_single' : "singlePlate",
		  			'direct_last_three_duplex' : last_three_duplex,
		  			'direct_last_three_sum' : last_three_sum,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '后三组选',
		  		items : [ bettings.group_last_three_three_duplex, bettings.group_last_three_three_single, bettings.group_last_three_six_duplex,
		  					bettings.group_last_three_six_single, bettings.group_last_three_mix_single],
		  		selectPlate : {
		  			'group_last_three_three_duplex' : last_three_three_duplex,
		  			'group_last_three_three_single' : "singlePlate",
		  			'group_last_three_six_duplex' : last_three_six_duplex,
		  			'group_last_three_six_single' : "singlePlate",
		  			'group_last_three_mix_single' : "singlePlate",
		  		}
		  	}
	  	],
	  	any_three : [
		  	{
		  		name : 'direct',
		  		desc : '后三直选',
		  		items : [bettings.direct_any_three_duplex, bettings.direct_any_three_single, bettings.direct_any_three_sum ],
		  		selectPlate : {
		  			'direct_any_three_single' : "singlePlate",
		  			'direct_any_three_duplex' : any_three_duplex,
		  			'direct_any_three_sum' : any_three_sum,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '后三组选',
		  		items : [ bettings.group_any_three_three_duplex, bettings.group_any_three_three_single, bettings.group_any_three_six_duplex,
		  					bettings.group_any_three_six_single, bettings.group_any_three_mix_single],
		  		selectPlate : {
		  			'group_any_three_three_duplex' : any_three_three_duplex,
		  			'group_any_three_three_single' : "singlePlate",
		  			'group_any_three_six_duplex' : any_three_six_duplex,
		  			'group_any_three_six_single' : "singlePlate",
		  			'group_any_three_mix_single' : "singlePlate",
		  		}
		  	}
	  	],
	  	first_two : [
		  	{
		  		name : 'direct',
		  		desc : '前二直选',
		  		items : [bettings.direct_first_two_duplex, bettings.direct_first_two_single, bettings.direct_first_two_sum ],
		  		selectPlate : {
		  			'direct_first_two_single' : "singlePlate",
		  			'direct_first_two_duplex' : first_two_duplex,
		  			'direct_first_two_sum' : first_two_sum,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '前二组选',
		  		items : [ bettings.group_first_two_duplex, bettings.group_first_two_single],
		  		selectPlate : {
		  			'group_first_two_duplex' : first_two_group_duplex,
		  			'group_first_two_single' : "singlePlate",
		  		}
		  	}
	  	],
	  	last_two : [
		  	{
		  		name : 'direct',
		  		desc : '后二直选',
		  		items : [bettings.direct_last_two_duplex, bettings.direct_last_two_single, bettings.direct_last_two_sum ],
		  		selectPlate : {
		  			'direct_last_two_single' : "singlePlate",
		  			'direct_last_two_duplex' : last_two_duplex,
		  			'direct_last_two_sum' : last_two_sum,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '后二组选',
		  		items : [ bettings.group_last_two_duplex, bettings.group_last_two_single],
		  		selectPlate : {
		  			'group_last_two_duplex' : last_two_group_duplex,
		  			'group_last_two_single' : "singlePlate",
		  		}
		  	}
	  	],
	  	any_two : [
		  	{
		  		name : 'direct',
		  		desc : '任二直选',
		  		items : [bettings.direct_any_two_duplex, bettings.direct_any_two_single, bettings.direct_any_two_sum ],
		  		selectPlate : {
		  			'direct_any_two_single' : "singlePlate",
		  			'direct_any_two_duplex' : any_two_duplex,
		  			'direct_any_two_sum' : any_two_sum,
		  		}
		  	},
		  	{
		  		name : 'group',
		  		desc : '任二组选',
		  		items : [ bettings.group_any_two_duplex, bettings.group_any_two_single],
		  		selectPlate : {
		  			'group_any_two_duplex' : any_two_group_duplex,
		  			'group_any_two_single' : "singlePlate",
		  		}
		  	}
	  	],
	  	location_gall : [
		  	{
		  		name : 'location',
		  		desc : '定位胆',
		  		items : [bettings.location_gall_type ],
		  		selectPlate : {
		  			'location_gall_type' : location_gall_duplex,
		  		}
		  	},
	  	],
	  	not_location : [
		  	{
		  		name : 'not_location',
		  		desc : '定位胆',
		  		items : [bettings.not_location_last_three_one_code, bettings.not_location_first_three_one_code,
		  					bettings.not_location_last_three_two_code, bettings.not_location_first_three_two_code ],
		  		selectPlate : {
		  			'not_location_last_three_one_code' : not_location_gall_duplex,
		  			'not_location_first_three_one_code' : not_location_gall_duplex,
		  			'not_location_last_three_two_code' : not_location_gall_duplex,
		  			'not_location_first_three_two_code' : not_location_gall_duplex,
		  		}
		  	},
	  	],
	  	big_little_odd_even : [
		  	{
		  		name : 'big_little_odd_even',
		  		desc : '大小单双',
		  		items : [bettings.big_little_odd_even_first_two, bettings.big_little_odd_even_last_two],
		  		selectPlate : {
		  			'big_little_odd_even_first_two' : big_little_odd_even_first_two_duplex,
		  			'big_little_odd_even_last_two' : big_little_odd_even_last_two_duplex,
		  		}
		  	},
	  	],
	  	interesting : [
		  	{
		  		name : 'interesting',
		  		desc : '大小单双',
		  		items : [bettings.interesting_one, bettings.interesting_two, bettings.interesting_three, bettings.interesting_four ],
		  		selectPlate : {
		  			'interesting_one' : interesting_one_duplex,
		  			'interesting_two' : interesting_two_duplex,
		  			'interesting_three' : interesting_three_duplex,
		  			'interesting_four' : interesting_four_duplex,
		  		}
		  	},
	  	],
	}

}

