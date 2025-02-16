<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const items = ref([
  {
    label: 'Home',
    route: '/dashboard',
  },
  {
    label: 'Courses',
    route: '/demo',
  },
  {
    label: 'Blogs',
    route: '/blogs',
  },
  {
    label: 'Study Material',
    route: '/study-materials',
  },
]);

const router = useRouter();
</script>

<template>
  <nav>
    <Menubar :model="items">
      <template #start>
        <Avatar shape="circle" :onclick="() => router.push('/dashboard')">
          <template #icon>
            <img src="../../assets/cs_masters_logo.png" />
          </template>
        </Avatar>
      </template>
      <template #item="{ item, props }">
        <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a class="flex items-center" :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
          <Button label="Logout" @click="router.replace('/login')" />
          <Avatar shape="circle">
            <template #icon>
              <img src="../../assets/cs_masters_logo.png" />
            </template>
          </Avatar>
        </div>
      </template>
    </Menubar>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
