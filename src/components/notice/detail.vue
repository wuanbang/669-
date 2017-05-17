<template>
	<div class="Contentbox" >
		<div id="con_one_1">
			<div class="ggTit">{{data.title}}</div>
			<div class="ggCon">
				<p>&nbsp;&nbsp;{{data.content}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
	      	data: Object,
	    },
    }
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.Contentbox {
		margin-left: 5px;
		font-size: 12px;
		color: #000;
		background: transparent; 
	}
	.ggTit {
	    margin-bottom: 20px;
	    padding-bottom: 20px;
	    font-size: 24px;
	    text-align: center;
	    border-bottom: dashed 1px #ddd;
	    font-family: "Microsoft YaHei";
	    font-weight: normal !important;
	}
	.ggCon {
		padding: 5px;
	    font-size: 14px;
	    line-height: 1.8em;
	    font-weight: normal !important;
	}
</style>