<script setup lang="ts">
  import { ref } from 'vue';
  import { z } from 'zod';
  import { useRouter } from 'vue-router';

  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { useToast } from 'primevue/usetoast';
  import { Form, type FormSubmitEvent } from '@primevue/forms';
  import InputText from 'primevue/inputtext';
  import Message from 'primevue/message';
  import Button from 'primevue/button';
  import { useAuthStore } from '@/stores/authStore';
  import { useErrorStore } from '@/stores/errorStore';

  const toast = useToast();
  const router = useRouter();
  const authStore = useAuthStore();
  const errorStore = useErrorStore();

  const initialValues = ref({
    username: '',
    email: '',
    password: '',
  });

  const resolver = ref(
    zodResolver(
      z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
        password: z
          .string()
          .min(1, { message: 'Password is required.' })
          .max(20, { message: 'Password is too long.' })
          .refine(
            (value) => {
              return !/\s/.test(value);
            },
            { message: 'Password should not contain spaces.' }
          ),
      })
    )
  );

  const onFormSubmit = async ({ valid, values }: FormSubmitEvent) => {
    if (valid) {
      const error = await authStore.signUpUser(values.username, values.email, values.password);

      if (error && errorStore.getError()) {
        toast.add({
          severity: 'error',
          summary: 'Signup Failed!',
          detail: errorStore.getError(),
          life: 3000,
        });
      } else {
        router.replace('/login');
        toast.add({
          severity: 'success',
          summary: 'Signup Successfull',
          detail: 'Please confirm your email address to login.',
          life: 3000,
        });
      }
    }
  };
</script>

<template>
  <div class="flex justify-center w-screen h-screen items-center flex-col">
    <h1 class="mb-4 text-3xl">Register to our platform</h1>
    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56">
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
          $form.username.error?.message
          }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="Email" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
          $form.email.error?.message
          }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="password" type="password" placeholder="Password" fluid />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error?.message
          }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Register" />
      <Button type="button" label="Login" class="mt-2" @click="router.replace('/login')" />
    </Form>
  </div>
</template>
