import type IStudent from "@/interfaces/IStudent";
import StudentService from "@/services/StudentService";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useStudentStore = defineStore("student", () => {
    const student = ref({}) as Ref<IStudent>;
    const students = ref([]) as Ref<IStudent[]>;
    const service = ref();
    async function getStudents(){
        service.value = new StudentService();
        await service.value.fetchStudents();
        students.value = service.value.getStudents();
        console.log('Store:'+students.value);
    }

    async function getStudent(id: string){
        service.value = new StudentService();
        await service.value.fetchStudent(id);
        student.value = service.value.getStudent().value;
        console.log('Student:'+student.value.name)
    }

    async function createStudent(student: IStudent){
        service.value = new StudentService();
        await service.value.createStudent(student);
    }

    async function deleteStudent(id: string){
        service.value = new StudentService();
        await service.value.deleteStudent(id);
    }

    return { student, students, getStudents, getStudent, createStudent, deleteStudent };
})