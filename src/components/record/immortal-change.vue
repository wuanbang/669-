<template>
    <div class="contentBox">
    </div>
</template>
<script lang="babel">
    export default {

        data(){
            return {
                defaultActive : "1",
                value1 : '',
                value2 : ''
            }
        },
        methods :{
            handleClick(tab){
                console.log(tab)
            },
        }
    }
</script>
<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
    input {
        outline: medium;
    }
    select {
        outline: none;
    }
</style>