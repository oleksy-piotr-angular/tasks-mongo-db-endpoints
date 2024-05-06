import { Task } from 'src/app/models/task';
export const dataSAMPLE: Task[] = [
  {
    _id: '65f9dc230e9a741b2f839172',
    name: 'HttpServiceSpec1',
    created: '19.03.2024, 19:40:35',
    isDone: true,
    end: '19.03.2024, 19:56:13',
  },
  {
    _id: '65f61f445de588ed3759fc68',
    name: 'HttpServiceSpec2',
    created: '16.03.2024, 23:37:56',
    isDone: true,
    end: '17.03.2024, 00:01:27',
  },
  {
    _id: '65f752947d19b8ac9ed778e6',
    name: 'HttpServiceSpec3',
    created: '17.03.2024, 21:29:07',
    isDone: false,
  },
  {
    _id: '65f9c5d95ce004f4077cd60f',
    name: 'HttpServiceSpec4',
    created: '19.03.2024, 18:05:29',
    isDone: false,
  },
];

export const dataSAMPLE_done: Task[] = [
  {
    _id: '65f9dc230e9a741b2f839172',
    name: 'HttpServiceSpec1',
    created: '19.03.2024, 19:40:35',
    isDone: true,
    end: '19.03.2024, 19:56:13',
  },
  {
    _id: '65f61f445de588ed3759fc68',
    name: 'HttpServiceSpec2',
    created: '16.03.2024, 23:37:56',
    isDone: true,
    end: '17.03.2024, 00:01:27',
  },
];

export const dataNEW_TASK: Task = {
  name: 'newTask',
  created: '17.03.2024, 21:10:07',
  isDone: false,
};
