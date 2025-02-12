<script>
  export default {
    data: () => ({
      links: [
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>
<template>
    <v-app class="footerSub">
        <v-footer class="bg-black text-white">
          <v-row justify="center" no-gutters>
            <v-btn
              v-for="link in links"
              :key="link"
              class="footerText"
              color="white"
              variant="text">
              {{ link }}
            </v-btn>
            <div class="bg-black d-flex w-100 align-center px-4 ml-16">
                <strong>Get connected with us on social networks!</strong>

                <v-spacer></v-spacer>

                <v-btn
                v-for="icon in icons"
                :key="icon"
                :icon="icon"
                class="mx-2"
                size="large"
                variant="plain"
                ></v-btn>
            </div>
            <v-col class="text-center mt-4" cols="12">
              {{ new Date().getFullYear() }} — <strong>Created by Jatin Oomajee</strong>
            </v-col>
          </v-row>
        </v-footer>
    </v-app>
  </template>

<style lang="scss" scoped>
.footerSub {
    position: relative;
    bottom: -350px;
    height: 100px;
    font-size: 18px;

    .footerText {
      font-size: 24px;
      border-radius: 0;
    }
}

:deep(.v-application__wrap) {
  min-height: 0;
}
</style>