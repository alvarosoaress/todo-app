import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../../firebaseConfig';

const todoCollection = collection(db, 'todos');

export async function getTodos() {
  try {
    const data = await getDocs(todoCollection);
    // data retorna uma response com muitos parametros
    // cleanData serve para pegar apenas os dados dos ToDos
    const cleanData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return cleanData;
  } catch (error) {
    console.log('Error in getTodos');
  }
}

export async function addTodo(title, description) {
  const createdAt = Timestamp.fromDate(new Date());

  try {
    await addDoc(todoCollection, {
      title,
      description,
      createdAt,
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}
