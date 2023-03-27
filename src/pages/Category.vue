<script setup>
import axios from "axios";
import router from "../router";
import { ref, onMounted } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.token}`;
});

let items = ref([]);
let state = ref("insert");
let statebool = ref(false);
let IdItem = ref("");
let nameItem = ref("");
let desc = ref("");

getCat();

async function getCat() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/Category/");
    items.value = response.data.categories;
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteCat(id) {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/Category/${id}/delete/`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    router.go();
  } catch (error) {
    console.log(error);
  }
}

async function saveCat() {
  if (state.value == "edit") {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/Category/${IdItem.value}`,
        {
          id: IdItem.value,
          name: nameItem.value,
          description: desc.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      IdItem = "";
      nameItem = "";
      desc = "";
      statebool = false;
      state.value = "insert";
      console.log(statebool);
    } catch (error) {
      console.log(error);
    }
  } else if (state.value == "insert") {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/Category`,
        {
          name: nameItem.value,
          description: desc.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      IdItem = "";
      nameItem = "";
      desc = "";
    } catch (error) {
      console.log(error);
    }
  }
  router.go();
}

async function getCatById(id) {
  try {
    console.log(localStorage.token);
    const response = await axios.get(
      `http://127.0.0.1:8000/api/Category/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    );
    IdItem.value = response.data.id;
    nameItem.value = response.data.name;
    desc.value = response.data.description;
  } catch (error) {
    console.log(error);
  }
}
async function changestate(id) {
  getCatById(id);
  state.value = "edit";
  statebool = true;
}
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Category Page</h3>

    <form class="w-full">
      <h3 class="text-2xl font-bold text-left py-2">{{ state }}</h3>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Category Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="text"
            placeholder="Bonsai"
            v-model="nameItem"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Category-ID
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="ID"
            v-model="IdItem"
            readonly
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Desc
          </label>
          <textarea
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            placeholder="Writing here"
            v-model="desc"
          ></textarea>
        </div>
      </div>
    </form>

    <div class="overflow-x-auto relative sm:rounded-lg">
      <button class="btn btn-blue" @click="saveCat()">Save</button>
      <button
        class="btn btn-red"
        style="margin-right: 15px"
        v-if="statebool"
        @click="canceledit()"
      >
        Cancel
      </button>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Name</th>

            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">ID</div>
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">Desc</div>
            </th>
            <th scope="col" class="py-3 px-6">
              <span class="sr-only">Edit</span>
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
              {{ item.name }}
            </th>

            <td class="py-4 px-6">{{ item.id }}</td>
            <td class="py-4 px-6">{{ item.description }}</td>
            <td class="py-4 px-6 text-right">
              <button
                @click="changestate(item.id)"
                href=""
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="deleteCat(item.id)"
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
