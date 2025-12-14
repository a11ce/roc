interface Task {
  onTick: () => boolean | void;
  resolve: () => void;
}

export interface TaskController {
  runTask(onTick: () => boolean | void): Promise<void>;
  update(): void;
}

export function createTaskController(): TaskController {
  const tasks: Task[] = [];

  const runTask = (onTick: () => boolean | void): Promise<void> => {
    return new Promise((resolve) => {
      tasks.push({
        onTick,
        resolve,
      });
    });
  };

  const update = () => {
    for (let i = tasks.length - 1; i >= 0; i--) {
      const task = tasks[i];
      if (task.onTick()) {
        task.resolve();
        tasks.splice(i, 1);
      }
    }
  };

  return {
    runTask,
    update,
  };
}
