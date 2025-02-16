<script setup>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      username (value) {
        if (value?.length >= 2) return true

        return 'Field empty'
      },
      password (value) {
        if (value?.length >= 2) return true

        return 'Field empty'
      }
    },
  })

  const username = useField('username')
  const password = useField('password')

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>

<template>
    <v-container>
      <v-row justify="space-around">
        <v-col cols="12" md="6">
          <v-dialog
            transition="dialog-bottom-transition"
            width="auto"
          >
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                text="LOGIN"
                block
                class="bg-black text-white btn"></v-btn>
            </template>
  
            <template v-slot:default="{ isActive }">
              <v-card>
                <form @submit.prevent="submit" class="formLogin">
                    <v-text-field
                        v-model="username.value.value"
                        :counter="10"
                        :error-messages="username.errorMessage.value"
                        label="Username"
                        variant="outlined">
                    </v-text-field>

                    <v-text-field
                    v-model="password.value.value"
                    :error-messages="password.errorMessage.value"
                    label="Password"
                    variant="outlined"></v-text-field>

                    <div class="wrapBTN">
                        <v-btn
                        class="me-4"
                        type="submit">
                        submit
                        </v-btn>
    
                        <v-btn @click="handleReset">
                        clear
                        </v-btn>
                    </div>
                </form>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-dialog
            transition="dialog-top-transition"
            width="auto">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                text="SIGN UP"
                block
                class="bg-black text-white btn"></v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-text class="text-h2 pa-12">
                  NO REGISTER FEATURE
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </template>

<style lang="scss" scoped>
.btn, .v-btn {
    font-size: 24px;
    border-radius: 0!important;
}

.v-col-12, .v-container {
    padding: 0;
}

.v-row {
    margin: 0;
    justify-content: flex-end!important;
    border-radius: 0;
}

.v-col-md-6 {
    flex: 0 0 0;
}

.v-btn--variant-elevated {
    box-shadow: none;
}

.v-card {
    border-radius: 0!important;
    width: 500px;
}

.text-h2 {
    font-family: "Teko", serif;
}

.formLogin {
    padding: 20px;

    :deep(.v-field)  {
        border-radius: 0!important;
    }

    .wrapBTN {
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        .v-btn {
            font-size: 18px;
            background-color: #191919;
            color: white;
        }
    }
}
</style>