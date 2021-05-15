<template>
  <header class="scrapper-header">
    {{ title }}
  </header>
</template>

<script>
  export default {
    name: "scrapper-header",
    components: {},
    props: {
      title: {
        type: String,
        default: 'Header'
      }
    },
    data() {
      return {
        
      };
    },
    created() {},
    mounted() {},
    methods: {},
    computed: {},
    watch: {},
  }
</script>

<style lang="sass">
.scrapper-header
  font-size: 2em
  font-weight: 700
  padding: 40px 0 20px 0

</style>