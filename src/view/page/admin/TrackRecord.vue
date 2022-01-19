<template>
  <b-overlay :show="busy" spinner-type="grow" rounded="sm"> </b-overlay>
</template>
<script>
export default {
  name: 'TrackRecord',
  data: function () {
    return { busy: true };
  }
};
</script>
