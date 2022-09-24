<template>
	<div>
		<h1>Register</h1>
		<form>
			<div class="fielgroup">
				<label for="login">Login</label>
				<input type="text" id="login" v-model="login" />
			</div>
			<div class="fielgroup">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="email" />
			</div>
			<div class="fieldgroup">
				<label for="password">Password</label>
				<input type="password" id="password" v-model="password" />
			</div>
			<button type="submit" @click.prevent="sendRegister">Register</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const login = ref("");
const email = ref("");
const password = ref("");

const sendRegister = () => {
	fetch("http://localhost:80/registration", {
		method: "POST",
		headers: {
			"Content-Type": "applicationw/json",
		},
		body: JSON.stringify({
			pseudo: login.value,
			email: email.value,
			password: password.value,
		}),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				console.log(res);
			}
		})
		.then((data) => {
			console.log(data);
		});
};
</script>

<style scoped>
.fielgroup {
	flex-direction: column;
	object-fit: contain;
	disay: flex;
	margin: 0;
	padding: 0;
}
</style>
