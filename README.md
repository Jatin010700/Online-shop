# Online-shop

### Ref()
To declare reactive state
```
import { ref } from 'vue'

const count = ref(0)
```
ref() takes the argument and returns it wrapped within a ref object with a .value property
```
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```
#
### Reactive()
```
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```
#
### Computed()
The computed() function expects to be passed a getter function, and the returned value is a computed ref.

You can access the computed result as publishedBooksMessage.value
```
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
```
Computed property will never update, because Date.now() is not a reactive dependency
```
const now = computed(() => Date.now())
```