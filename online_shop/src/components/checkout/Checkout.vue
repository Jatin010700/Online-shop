<script setup>
import Navbar from '../navigation/Navbar.vue';
import { useCartStore } from '../../store_state/cartState';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const getCart = useCartStore();
const { cartList } = storeToRefs(getCart);

const steps = ref(1);
const stepsNumber = ref(3);
const stepsTitle = ["Review Order", "Select Shipping", "Confirm Order"];
const shipping = ref(10);
const selectedShipping = ref(null);

const totalPrice = computed(() => {
  if (!cartList.value || !Array.isArray(cartList.value)) return "0.00";

  return cartList.value.reduce((total, item) => {
    const discountedPrice = item.discount 
        ? item.price * (1 - item.discount / 100) 
        : item.price;
        return total + discountedPrice * item.quantity;
      }, 0).toFixed(2);
});

const increaseQty = (productId) => {
  getCart.increaseQty(productId);
};

const decreaseQty = (productId) => {
  getCart.decreaseQty(productId);
};

const noCart = computed(() => cartList.value.length === 0);
const disabled = computed(() => steps.value === 1 ? "prev" : steps.value === stepsNumber.value ? "next" : undefined);
const currentStepTitle = computed(() => stepsTitle[steps.value - 1] || "");
const total = computed(() => (parseFloat(totalPrice.value) + parseFloat(shipping.value)).toFixed(2));

const validateStep = (step) => {
  if (step === 1) {
    return cartList.value.length > 0;
  } else if (step === 2) {
    return selectedShipping.value !== null;
  } else if (step === 3) {
    return cartList.value.length > 0 && selectedShipping.value !== null;
  }
};

const next = () => {
  if (steps.value < stepsNumber.value && validateStep(steps.value)) {
    steps.value++;
  }
};

const prev = () => {
  if (steps.value > 1) steps.value--;
};
</script>

<template>
  <div class="wrapNav">
    <transition name="slide-left" mode="out-in">
      <h1 :key="currentStepTitle">{{ currentStepTitle }}</h1>
    </transition>
    <Navbar propNavbarContainer="classPropNavContainer" />
  </div>

  <v-container class="checkContainer">
    <v-stepper v-model="steps" 
    show-actions
    alt-labels>
      <v-stepper-header>
        <template v-for="n in stepsNumber" :key="`${n}-step`">
          <v-stepper-item
            :complete="stepsNumber > n" 
            :title="stepsTitle[n - 1]"
            :step="`Step ${n}`"
            :value="n"
            :rules="[() => validateStep(n)]"
            :subtitle="!validateStep(n) ? 'Missing Details' : ''"
          ></v-stepper-item>

          <v-divider v-if="n !== stepsNumber" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item v-for="n in stepsNumber" :key="`${n}-content`" :value="n">
          <div v-if="n === 1">
            <div class="no-results" v-if="noCart">
                CART EMPTY
            </div>
            <v-sheet border v-if="!noCart">
              <v-table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th class="text-end quantity">Quantity</th>
                    <th class="text-end">Discount</th>
                    <th class="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in cartList" :key="index" class="test">
                    <td>{{ product.title }}</td>
                    <td class="text-end">
                      <v-btn icon variant="text" @click="increaseQty(product.id)" class="clickable">
                          <v-icon icon="mdi-arrow-up-thick"></v-icon>
                      </v-btn>
                      {{ product.quantity }}
                      <v-btn icon variant="text" @click="decreaseQty(product.id)" class="clickable">
                          <v-icon icon="mdi-arrow-down-thick"></v-icon>
                      </v-btn>
                    </td>
                    <td class="text-end"><span v-if="product.discount > 0">-{{ product.discount }}%</span></td>
                    <td class="text-end fixWidth">
                        ${{ product.discount 
                            ? ((product.price * (1 - product.discount / 100)) * product.quantity).toFixed(2) 
                            : (product.price * product.quantity).toFixed(2) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                    <th class="text-end">${{ totalPrice || "0.00"}}</th>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </div>

          <div v-if="n === 2">
            <v-radio-group v-model="selectedShipping" label="Delivery Method">
              <v-radio label="Standard Shipping ($5)" value="5"></v-radio>
              <v-radio label="Priority Shipping ($10)" value="10"></v-radio>
              <v-radio label="Express Shipping ($15)" value="15"></v-radio>
            </v-radio-group>
          </div>

          <div v-if="n === 3">
            <v-sheet border>
              <v-table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th class="text-end">Quantity</th>
                    <th class="text-end">Discount</th>
                    <th class="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in cartList" :key="index">
                    <td>{{ product.title }}</td>
                    <td class="text-end">{{ product.quantity }}</td>
                    <td class="text-end"><span v-if="product.discount > 0">-{{ product.discount }}%</span></td>
                    <td class="text-end">
                        ${{ product.discount 
                            ? ((product.price * (1 - product.discount / 100)) * product.quantity).toFixed(2) 
                            : (product.price * product.quantity).toFixed(2) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td></td>
                    <td></td>
                    <th class="text-end">+ ${{ shipping }}</th>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                    <th class="text-end">${{  total || "0.00"}}</th>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </div>
        </v-stepper-window-item>
      </v-stepper-window>

      <v-stepper-actions
        v-if="!noCart && steps !== 3"
        :disabled="disabled"
        @click:next="next"
        @click:prev="prev"
      />

      <div class="wrapBTN" v-if="steps === 3">
        <v-btn
        @click="prev">
        Previous
      </v-btn>

      <v-btn
        @click="submit">
        Submit
      </v-btn>
      </div>
    </v-stepper>
  </v-container>
</template>

<style lang="scss" scoped>
.wrapNav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        margin-left: 87px;
        font-size: 50px;
        text-transform: uppercase;
    }

    .classPropNavContainer {
        margin: 0;
    }
}

.checkContainer {
    padding: 0 20px;
    margin-left: 68px;
    max-width: 1312px;

    .v-stepper.v-sheet {
        box-shadow: none;
        border-radius: 0;
    }

    :deep(.v-stepper-header) {
        box-shadow: none;
    }

    :deep(.v-stepper-item__avatar.v-avatar) {
        border-radius: 0;
        background-color: #191919;
    }

    :deep(.v-stepper-item__title) {
        font-size: 24px;
    }

    :deep(.v-btn) {
        border-radius: 0!important;
        background-color: #191919;
        color: white;
        font-size: 24px;
        height: 50px;

        &.v-btn--disabled {
            opacity: 0;
        }
    }

    th {
        font-size: 18px;
    }

    :deep(.v-label) {
        font-size: 18px;
        opacity: 1;
    }

    .no-results {
      background-color: white;
      color: #191919;
      text-align: center;
      font-size: 3.2em;
      height: 58vh;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .quantity {
    padding-right: 45px;
  }

  .fixWidth {
    width: 20%;
  }

  .clickable {
    background-color: transparent;
    color: #191919;
    font-size: 20px;
  }

  :deep(.v-btn__underlay) {
    background-color: transparent;
  }
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: all 0.2s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.v-stepper-item--error {
    color: #FE5253;
}
:deep(.mdi-close-circle) {
  color: #FE5253;
}

.wrapBTN {
  padding: 0 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.v-stepper-item__avatar) {
  margin-bottom: 5px!important;
  width: 35px!important;
  height: 35px!important;

  .v-icon {
    font-size: 1.5rem!important;
  }
}

.v-divider {
  margin: 42px -67px 0!important;
}

.v-stepper-item {
  flex-basis: 200px!important;
}
</style>