<script setup>
import axios from "axios";
import { ref } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);

  if (token) {
    localStorage.token = token;
    return;
  } else {
    if (localStorage.token) {
      token = localStorage.token;
    }
  }
});

let items = ref([]);
let token = "";
const addressItem = ref("");
const phoneItem = ref("");
const statusItem = ref("");
const userItem = ref("");

getOrd();

async function getOrd() {
  try {
    const response = await axios.get("http://localhost:8000/api/Order");
    items.value = response.data.Orders;
  } catch (error) {
    console.log(error);
  }
}

async function deleteOrd(id) {
  try {
    await axios.delete(`http://localhost:8000/api/Order/${id}`);
    getOrd();
  } catch (error) {
    console.log(error);
  }
}

async function saveOrd() {
  try {
    await axios.post(`http://localhost:8000/api/Order/${id}`, {
      user_id: userItem,
      address: addressItem,
      phone_number: phoneItem,
      status: statusItem,
    });
    addressItem = "";
    phoneItem = "";
    statusItem = "";
    userItem = "";
  } catch (error) {
    console.log(error);
  }
}

async function getOrdById(id) {
  try {
    const response = await axios.get(`http://localhost:8000/api/Order/${id}`);
    addressItem = response.data.Orders.address;
    phoneItem = response.data.Orders.phone_number;
    statusItem = response.data.Orders.status;
    userItem = response.data.Orders.user_id;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

async function updateOrd(id) {
  await axios.put(`http://localhost:8000/api/Order/${id}`, {
    user_id: userItem,
    address: addressItem,
    phone_number: phoneItem,
    status: statusItem,
  });
  addressItem = "";
  phoneItem = "";
  statusItem = "";
  userItem = "";
}
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Orders Page</h3>

    <form class="w-full">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            User ID
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="text"
            v-model="userItem.value"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Address
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="text"
            v-model="addressItem.value"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Phone Number
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="text"
            v-model="phoneItem.value"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Status
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="text"
            v-model="statusItem.value"
          />
        </div>
      </div>
    </form>

    <div class="overflow-x-auto relative sm:rounded-lg">
      <button class="btn btn-blue">Save</button>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-5">ID</th>
            <th scope="col" class="py-3 px-5">User ID</th>
            <th scope="col" class="py-3 px-5">
              <div class="flex items-center">Address</div>
            </th>
            <th scope="col" class="py-3 px-5">
              <div class="flex items-center">Phone Number</div>
            </th>
            <th scope="col" class="py-3 px-5">
              <div class="flex items-center">Total Price</div>
            </th>
            <th scope="col" class="py-3 px-5">
              <div class="flex items-center">Status</div>
            </th>
            <th scope="col" class="py-3 px-5">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- things that change -->
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="item in items"
            :key="item.id"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.id }}
            </th>

            <td class="py-4 px-6">{{ itemuser_id }}</td>
            <td class="py-4 px-6">{{ item.address }}</td>
            <td class="py-4 px-6">{{ item.phone_number }}</td>
            <td class="py-4 px-6">{{ item.total_price }}</td>
            <td class="py-4 px-6">{{ item.status }}</td>
            <td class="py-4 px-6 text-right">
              <button
                @click="getOrdById(item.id)"
                href=""
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="deleteOrd(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded;
  margin-bottom: 10px;
  float: right;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
