<script setup lang="ts">
import type IStudent from '@/interfaces/IStudent';
import { useStudentStore } from '@/stores/student';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute} from 'vue-router';

const studentStore = useStudentStore();
const student:Ref<IStudent> = ref({}) as Ref<IStudent>;
onMounted(async()=> {
    const router = useRoute();
    const studentID = router.params.id as string;
    await studentStore.getStudent(studentID);
    student.value = studentStore.student;
})
</script>

<template>
<div class="container">
        <div class="card-client">
            <p class="name-client"> {{ student.name }}
                <span>{{ student.group }}</span>
            </p>
            <p class="name-client"> Contacto:
                <span>{{ student.email }}</span>
            </p>
        </div>
</div>
</template>

<style scoped>


</style>