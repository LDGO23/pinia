<template>
    <div class="container">
        <form class="user-table" @submit.prevent="submit" >
            <p class="title">Registro </p>
            <div class="input-container">
                <label for="name">Nombre:</label>
                <input class="input" type="text" v-model="name">
            </div>
            <div class="input-container">
                <label for="email">Correo:</label>
                <input class="input" type="email" v-model="email">
            </div>
            <div class="input-container">
                <label for="group">Grupo:</label>
                <input class="input" type="text" v-model="group">
            </div>
            <button class="submit" :disabled="!changeButtonState">Crear</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useStudentStore } from '@/stores/student';
import { ref, ComputedRef, Ref, computed } from 'vue';

const name: Ref<string> = ref('');
const email: Ref<string> = ref('');
const group: Ref<string> = ref('');
const errors: Ref<string[]> = ref([]);

const changeButtonState: ComputedRef<boolean> = computed(() => {
    return errors.value.length === 0;
});

const submit = async () => {
    requiere();

    if (!changeButtonState.value) {
        const errorMessage = errors.value.join('\n');
        alert(errorMessage);
        return;
    }

    const studentStore = useStudentStore();
    await studentStore.getStudents();
    const students = studentStore.students;
    let id;
    if (students.length === 0) {
        id = 1;
    } else {
        id = students[students.length - 1].id + 1;
    }
    const student = {
        id: id,
        name: name.value,
        email: email.value,
        group: group.value,
    };

    await studentStore.createStudent(student);

    router.push({ name: 'students' });
};

const requiere = () => {
    
    if (name.value.trim() === '') {
        errors.value.push('El nombre es requerido');
    }

    if (email.value.trim() === '') {
        errors.value.push('El correo es requerido');
    }

    if (group.value.length < 7 || group.value.trim() === '') {
        errors.value.push('El grupo es requerido');
    }
        if (email.value !== '' && !/^\S+@\S+\.\S+$/.test(email.value)) {
        errors.value.push('El correo debe contener @gmaiel');
    }
    clearErrors();
}

const clearErrors = () => {
    errors.value = [];
};
</script>

<style scoped>
.container {
    padding: 20px;
}

.user-table {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    color:black;
    background-color: #ffffff;
}

.input-container {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

.input {
    width: calc(100% - 12px);
    padding: 6px;
    border: 1px solid black;
    border-radius: 3px;
}

.submit {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.submit:hover {
    background-color: #0056b3;
}

.title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.message {
    font-size: 16px;
    margin-bottom: 20px;
    color: #555;
}
</style>
