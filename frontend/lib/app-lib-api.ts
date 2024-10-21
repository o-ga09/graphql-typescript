interface Diary {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

let diaries: Diary[] = [
  {
    id: 1,
    title: "最初の日記",
    content: "今日は素晴らしい一日でした。",
    author: "user1",
    createdAt: "2023-06-01T12:00:00Z",
  },
  {
    id: 2,
    title: "忙しい一日",
    content: "今日はとても忙しかったです。",
    author: "user2",
    createdAt: "2023-06-02T14:30:00Z",
  },
];

export const getDiary = async (id: number): Promise<Diary | undefined> => {
  return diaries.find((diary) => diary.id === id);
};

export const createDiary = async (
  diary: Omit<Diary, "id" | "createdAt">
): Promise<Diary> => {
  const newDiary: Diary = {
    ...diary,
    id: diaries.length + 1,
    createdAt: new Date().toISOString(),
  };
  diaries.push(newDiary);
  return newDiary;
};

export const updateDiary = async (
  id: number,
  diary: Partial<Diary>
): Promise<Diary | undefined> => {
  const index = diaries.findIndex((d) => d.id === id);
  if (index !== -1) {
    diaries[index] = { ...diaries[index], ...diary };
    return diaries[index];
  }
  return undefined;
};

export const deleteDiary = async (id: number): Promise<boolean> => {
  const initialLength = diaries.length;
  diaries = diaries.filter((diary) => diary.id !== id);
  return diaries.length < initialLength;
};
