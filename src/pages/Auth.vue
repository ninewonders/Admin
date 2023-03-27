<template>
  <!-- component -->
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 class="font-bold text-center text-2xl mb-5">Sign In As Admin</h1>
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
          <label class="font-semibold text-sm text-gray-600 pb-1 block"
            >E-mail</label
          >
          <input
            type="email"
            placeholder="Email or Phone Number"
            class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            v-model="email"
            required
          />
          <label class="font-semibold text-sm text-gray-600 pb-1 block"
            >Password</label
          >
          <input
            type="Password"
            placeholder="Password"
            class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            v-model="password"
          />

          <button
            @click="login()"
            class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <a class="inline-block mr-2">Log-in</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-4 h-4 inline-block"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "../router";

let token = "";
const email = ref("");
const password = ref("");

async function login() {
  if (email.value && password.value) {
    if (email.value.trim == "" && password.value.trim == "") {
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login?email=" +
          email.value +
          "&password=" +
          password.value
      );
      email.value = "";
      password.value = "";

      if (response.data.message == "Successfully logged in") {
        localStorage.token = response.data.token;
        router.push({
          name: "Category",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
