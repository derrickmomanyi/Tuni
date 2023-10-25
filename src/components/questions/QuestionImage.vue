<template>
  <div class="question-image">
      <img class="image-src" :src="asset" alt=""/>
  </div>
</template>

<script>
export default {
  props: {
    asset: {
      type: String,
      required: true
    }
  },
  computed:{
    // Access round from store
    round() {
      return this.$store.getters.round;
    },
  }
};
</script>
<style lang="sass">
    .question-image
        display: flex
        justify-content: center
        max-height: 350px
        overflow: hidden

    .image-src
        object-fit: contain
        padding-top: 0
        padding-right: 1rem
        padding-bottom: 1rem
        padding-left: 1rem
        width: 100%
</style>
