import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import db from '../../firebaseConfig';

const todoCollection = collection(db, 'todos');

// eslint-disable-next-line consistent-return
export async function getTodos() {
  try {
    const data = await getDocs(todoCollection);
    // data retorna uma response com muitos parametros
    // cleanData serve para pegar apenas os dados dos ToDos
    const cleanData = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    return cleanData;
  } catch (error) {
    console.log('Error in getTodos');
  }
}

export async function addTodo(title, description, tags) {
  const createdAt = Timestamp.fromDate(new Date());

  try {
    await addDoc(todoCollection, {
      title,
      description: description ?? null,
      tags: tags ?? [],
      completed: false,
      createdAt,
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

export async function completeTodo(id) {
  const completedAt = Timestamp.fromDate(new Date());

  const todoRef = doc(db, 'todos', id);

  try {
    await updateDoc(todoRef, { completed: true, completedAt });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}
