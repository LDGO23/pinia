<template>
    <div class="container">
        <ol class="list">
            <div v-for="(student, index) in students" :key="index" class="list-item">
                <li>
                    <RouterLink :to="{ name: 'student', params: { id: student.id } }">{{ student.name }}</RouterLink>
                </li>
                <button class="delete" v-on:click="deleteProject(student.id)">Eliminar</button>
            </div>
        </ol>
    </div>
</template>


<script lang="ts" setup>
import type IStudent from '@/interfaces/IStudent';
import { useStudentStore } from '@/stores/student';
import { onMounted, ref, type Ref} from 'vue';

const studentStore = useStudentStore();
const students:Ref<IStudent[]> = ref([]);

onMounted(async () => {
    await studentStore.getStudents();
    students.value = studentStore.students;
    console.log('Vista:'+students.value);
});

const deleteProject = async(id: number) => {
    const confirmDelete = confirm('¿Estás seguro de eliminarlo?');
    if(confirmDelete){
        await studentStore.deleteStudent(id.toString());
        students.value = studentStore.students;
        location.reload();
    }
};
</script>

<style scoped>
.container {
    background-color: #ffffff; 
    padding: 20px;
    display: flex;
    width: 50%;
    justify-content: center;
}

.list {
    list-style-type: none;
    padding: 0;
}

.list-item {
    margin-bottom: 10px;
    color: black; /* Texto negro */
}

.delete {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.delete:hover {
    background-color: #0056b3;
}
a{
color: black;
}
</style>