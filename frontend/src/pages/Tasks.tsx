import TaskForm from '../components/TaskForm';
import { useGetTaskQuery } from '../hooks/taskQueryHooks';
import TaskUI from '../components/TaskUI';
import { TaskStats } from '../utils/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Spinner from '../components/Spinner';

function Tasks() {
  const { data, isPending } = useGetTaskQuery();
  const [parent] = useAutoAnimate();
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between pb-1 border-b border-slate-300">
        <div>
          <h1 className="font-bold text-3xl">Tasks</h1>
          <p className="text-slate-800">Manage your daily tasks here.</p>
        </div>
        <TaskForm />
      </div>
      {isPending ? (
        <Spinner />
      ) : data && data.length > 0 ? (
        <div ref={parent} className="space-y-3">
          {data.map((task: TaskStats) => {
            return <TaskUI key={task._id} task={task} />;
          })}
        </div>
      ) : (
        <p className="pt-12 text-center font-mono tracking-widest text-slate-700 text-2xl font-semibold">
          No Task yet!
        </p>
      )}
    </div>
  );
}

export default Tasks;
