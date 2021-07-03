import React, { useEffect, useRef, useState } from "react";
import DroppableList from "../../components/DroppableList";
import Calendar from "react-calendar";
import Popup from "../../components/Popup";
import * as utilities from "../../utilities";
import { IColumn, ITag, ITask, ITodoColumn, ScreensType } from "../../types";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dailiesState,
  dateState,
  homeTasksState,
  tagsState,
  tasksState,
} from "../../recoil/atoms";
import { loadNewDailyTask, tasksSelectorState } from "../../recoil/selectors";
import { ScreensEditTask } from "../Task";
import { saveTasks } from "../../api";
import "react-calendar/dist/Calendar.css";
import "./index.css";

const ScreensHome: React.FC<ScreensType> = ({ hidden }) => {
  const [rerender, setRerender] = useState(false);
  const [refreshPopup, setRefreshPopup] = useState<boolean>(false);
  const [smallPopup, setSmallPopup] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [date, setDate] = useRecoilState(dateState);
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const [tasks, setTasks] = useRecoilState(homeTasksState);
  const [taskCol, setTaskCol] = useRecoilState(tasksState);
  const tags = useRecoilValue(tagsState);
  const dailies = useRecoilValue(dailiesState);
  const tasksSelector = useRecoilValue(tasksSelectorState);
  const todayRef = useRef(new Date());
  const compareDiff = (taskCol: ITodoColumn[], nTaskCol: ITodoColumn[]) => {
    const d1 = taskCol.map((t: ITodoColumn) => JSON.stringify(t));
    const d2 = nTaskCol.map((t: ITodoColumn) => JSON.stringify(t));
    d1.sort();
    d2.sort();
    return JSON.stringify(d1) !== JSON.stringify(d2);
  };
  const compareDiffRef = useRef(compareDiff);
  const setTasksRef = useRef(setTasks);

  const compareDaily = (tasks: ITodoColumn, dailies: ITodoColumn) => {
    const dailyTasks = loadNewDailyTask(date, dailies, true);
    if (tasks.id !== dailyTasks.id) return false;
    const ntasks = {
      ...tasks,
      tasks: tasks.tasks.map((t: ITask) => {
        return { ...t, tag: {} };
      }),
    };
    const ndailyTasks = {
      ...dailyTasks,
      tasks: dailyTasks.tasks.map((t: ITask) => {
        return { ...t, tag: {} };
      }),
    };
    const d1 = JSON.stringify(ntasks);
    const d2 = JSON.stringify(ndailyTasks);
    return d1 !== d2;
  };

  useEffect(() => {
    if (!hidden) setRerender(true);
    else setRerender(false);
  }, [hidden]);

  useEffect(() => {
    setTasks(tasksSelector.todoColumn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, tags]);

  useEffect(() => {
    // Load in tags if not exists
    const tasksWithoutTags = tasks.tasks.filter(
      (t: ITask) => t?.tag === undefined && (t?.tags?.length ?? -1 > 0)
    );
    if (tasksWithoutTags.length > 0) {
      const ntasks = tasks.tasks.map((t: ITask) => {
        const tag = tags.find((tg: ITag) => t?.tags?.includes(tg.id));
        if (!tag) return t;
        return { ...t, tag: tag };
      });
      setTasksRef.current({ ...tasks, tasks: ntasks });
    }
  }, [tasks, tags]);

  useEffect(() => {
    // Filter out tag
    const ntasks = tasks.tasks.map((t: ITask) => {
      const { tag, ...task } = t;
      return task;
    });
    const nTaskCol = [
      ...taskCol.filter((t: ITodoColumn) => t?.id !== tasks?.id),
      { ...tasks, tasks: ntasks },
    ];
    if (
      compareDiffRef.current(taskCol, nTaskCol) &&
      compareDaily(tasks, dailies) &&
      tasks?.id
    ) {
      setTaskCol(nTaskCol);
      saveTasks(nTaskCol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, tasks, dailies]);

  const addDate = (days: number) => {
    const ndate = new Date(date);
    ndate.setDate(ndate.getDate() + days);
    setDate(ndate);
  };
  const selectTaskHandler = (task: ITask, _: string) => {
    setPopup(true);
    setSelectedTask(task);
  };
  const deleteEventHandler = (task: ITask) => {
    // TODO: Add delete animation :)
    const ntaskList = tasks.tasks.filter((t: ITask) => t.id !== task.id);
    // Remove the id from column taskIds and checked attributes
    const ncolumn: IColumn = {
      ...tasks.columns[0],
      taskIds: tasks.columns[0].taskIds.filter((id: string) => id !== task.id),
      checked:
        tasks.columns[0]?.checked?.filter((id: string) =>
          ntaskList.map((t: ITask) => t.id).includes(id)
        ) ?? [],
    };
    // Update tasks and taskCol
    const ntasks = { ...tasks, columns: [ncolumn], tasks: ntaskList };
    const nTaskCol = [
      ...taskCol.filter((t: ITodoColumn) => t?.id !== tasks?.id),
      ntasks,
    ];
    setTasks(ntasks);
    setTaskCol(nTaskCol);
    // Save if tasks is empty as it will not be saved on the useEffect hook above otherwise
    if (ntaskList.length === 0) {
      saveTasks(nTaskCol);
    }
  };
  return (
    <div className="todaysTask" hidden={hidden}>
      <div className="topBackground">
        <h3>DAILYJUKIPLANNER</h3>
        <button className="refreshBtn" onClick={() => setRefreshPopup(true)}>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.33 4.69398L18.75 3.31698C18.8276 3.0633 19.0027 2.85083 19.237 2.7263C19.4712 2.60178 19.7453 2.5754 19.999 2.65298C20.2527 2.73056 20.4651 2.90573 20.5897 3.13996C20.7142 3.37419 20.7406 3.6483 20.663 3.90198L19.493 7.72698C19.4154 7.98047 19.2404 8.19279 19.0064 8.3173C18.7724 8.44181 18.4985 8.46831 18.245 8.39098L14.42 7.22098C14.2917 7.18488 14.172 7.12353 14.0678 7.04052C13.9636 6.95751 13.8771 6.85452 13.8132 6.73759C13.7494 6.62067 13.7096 6.49216 13.6961 6.35963C13.6826 6.2271 13.6957 6.0932 13.7347 5.96581C13.7737 5.83842 13.8377 5.72011 13.923 5.61781C14.0084 5.51551 14.1133 5.4313 14.2316 5.37011C14.35 5.30892 14.4793 5.27199 14.6121 5.2615C14.7449 5.251 14.8785 5.26714 15.005 5.30898L16.677 5.81998C15.9378 4.69888 14.9068 3.80066 13.695 3.22206C12.4832 2.64347 11.1366 2.40642 9.80003 2.53646C8.4635 2.66649 7.18777 3.15867 6.11023 3.95999C5.03268 4.76132 4.19416 5.84142 3.68498 7.08398L3.42498 7.71698C3.37769 7.84193 3.30584 7.95615 3.21368 8.05287C3.12152 8.1496 3.01091 8.22687 2.88839 8.28014C2.76586 8.3334 2.63391 8.36158 2.50031 8.36299C2.36672 8.36441 2.23419 8.33904 2.11056 8.28839C1.98694 8.23774 1.87471 8.16282 1.78052 8.06807C1.68633 7.97333 1.61208 7.86066 1.56215 7.73674C1.51222 7.61282 1.48764 7.48015 1.48984 7.34656C1.49204 7.21298 1.52099 7.08119 1.57498 6.95898L1.83498 6.32598C2.48121 4.74926 3.5447 3.37833 4.91125 2.3604C6.27781 1.34247 7.89583 0.715984 9.59156 0.548209C11.2873 0.380435 12.9967 0.677709 14.5362 1.40811C16.0758 2.13852 17.3873 3.27446 18.33 4.69398V4.69398ZM2.80798 15.307L2.48098 16.618C2.45172 16.748 2.39677 16.8709 2.31935 16.9793C2.24193 17.0878 2.14362 17.1797 2.03017 17.2497C1.91673 17.3196 1.79045 17.3662 1.65876 17.3866C1.52706 17.4071 1.39261 17.401 1.26331 17.3687C1.134 17.3364 1.01245 17.2787 0.905787 17.1988C0.799129 17.1188 0.70952 17.0184 0.642224 16.9034C0.574929 16.7884 0.531306 16.661 0.513919 16.5289C0.496531 16.3968 0.50573 16.2625 0.540975 16.134L1.50798 12.254C1.5406 12.1219 1.59984 11.9978 1.68208 11.8894C1.76431 11.781 1.86781 11.6905 1.98623 11.6235C2.10465 11.5564 2.23551 11.5143 2.37079 11.4996C2.50607 11.4849 2.64292 11.498 2.77298 11.538L6.60098 12.492C6.85837 12.5562 7.07972 12.72 7.21634 12.9474C7.35296 13.1747 7.39366 13.4471 7.32948 13.7045C7.26529 13.9619 7.10149 14.1832 6.8741 14.3198C6.64671 14.4565 6.37437 14.4972 6.11698 14.433L4.33098 13.988C5.09449 15.1568 6.17373 16.0853 7.44352 16.6656C8.7133 17.2459 10.1216 17.4544 11.5051 17.2668C12.8885 17.0792 14.1904 16.5033 15.2598 15.6058C16.3292 14.7082 17.1223 13.5259 17.547 12.196C17.5869 12.0708 17.6511 11.9548 17.7359 11.8544C17.8206 11.7541 17.9243 11.6714 18.0411 11.6111C18.1578 11.5509 18.2852 11.5142 18.4161 11.5032C18.547 11.4922 18.6788 11.5071 18.804 11.547C18.9291 11.5869 19.0452 11.6511 19.1455 11.7359C19.2459 11.8206 19.3285 11.9243 19.3888 12.0411C19.4491 12.1578 19.4858 12.2852 19.4968 12.4161C19.5078 12.547 19.4929 12.6788 19.453 12.804C19.0367 14.1099 18.3392 15.3088 17.4097 16.3162C16.4802 17.3236 15.3413 18.1151 14.073 18.635C12.0968 19.4446 9.90361 19.556 7.85553 18.951C5.80745 18.3459 4.02694 17.0605 2.80798 15.307V15.307Z"
              fill="white"
            />
          </svg>
        </button>
        <div className="infoBox">
          <div className="dateBox">
            <p className="day">{utilities.getDayFormatted(todayRef.current)}</p>
            <p className="month">{utilities.getMonthName(todayRef.current)}</p>
            <p className="year">{todayRef.current.getFullYear()}</p>
            <p className="weekday">{utilities.getWeekday(todayRef.current)}</p>
          </div>
          <div className="statsBox">
            <div className="stats">
              <p className="num">{tasksSelector.tasksChecked?.length ?? 0}</p>
              <p>done</p>
            </div>
            <div className="stats">
              <p className="num">{tasksSelector.tasks?.length ?? 0}</p>
              <p>due today</p>
            </div>
          </div>
        </div>
        <div className="navigationBox">
          <div className="statsBox">
            <p>
              {utilities.prettyDate(date)}
              <span>{utilities.getWeekday(date)}</span>
            </p>
            <div>
              <button onClick={() => setSmallPopup(true)}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.4 2.7063C0.4 1.82264 1.11634 1.1063 2 1.1063H15C15.8837 1.1063 16.6 1.82264 16.6 2.7063V11.421C16.6 12.3046 15.8837 13.021 15 13.021H2C1.11634 13.021 0.4 12.3046 0.4 11.421L0.4 2.7063Z"
                    stroke="#707070"
                    strokeWidth="0.8"
                  />
                  <path d="M4.76001 0V3.17867" stroke="#707070" />
                  <path d="M12.2401 0V3.17867" stroke="#707070" />
                  <path
                    d="M0 4.47363L17 4.47363"
                    stroke="#707070"
                    strokeWidth="0.8"
                  />
                  <path d="M8.5 3.17859V-8.14795e-05" stroke="#707070" />
                  <path
                    className="lfill"
                    d="M13.021 11.1842C13.021 13.6811 10.9969 15.7053 8.49997 15.7053C6.00306 15.7053 3.97892 13.6811 3.97892 11.1842C3.97892 8.68733 6.00306 6.66318 8.49997 6.66318C10.9969 6.66318 13.021 8.68733 13.021 11.1842Z"
                    fill="#F7DAF8"
                    stroke="#707070"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M9.59357 12.2779C10.6871 13.3715 8.5 11.1844 8.5 11.1844C8.5 10.3095 8.5 6.81011 8.5 8.99724"
                    stroke="#707070"
                    strokeWidth="0.5"
                  />
                </svg>
              </button>
              <button onClick={() => setDate(new Date())}>
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0777 10.0441L11.1172 10.4H11.4753H11.5023C12.0592 10.4 12.5934 10.6213 12.9872 11.0151C13.381 11.4089 13.6023 11.9431 13.6023 12.5C13.6023 13.057 13.381 13.5911 12.9872 13.985C12.5934 14.3788 12.0592 14.6 11.5023 14.6L3.00227 14.6L3.00197 14.6C2.33061 14.6005 1.68508 14.3413 1.2005 13.8767C0.715928 13.412 0.42987 12.7779 0.40221 12.1072C0.37455 11.4364 0.607432 10.7809 1.05211 10.2779C1.49678 9.77493 2.11878 9.46346 2.7879 9.4087L3.04697 9.38749L3.13282 9.14215C3.4398 8.26489 4.03572 7.51797 4.82289 7.02384C5.61006 6.5297 6.54175 6.31767 7.46523 6.42252C8.38871 6.52736 9.24916 6.94285 9.90553 7.60088C10.5619 8.2589 10.9752 9.12041 11.0777 10.0441Z"
                    stroke="#707070"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M14.0715 2.28415L14.0716 2.28418C14.0955 2.26112 14.1145 2.23353 14.1276 2.20303C14.1407 2.17253 14.1476 2.13972 14.1479 2.10653C14.1482 2.07333 14.1419 2.04041 14.1293 2.00969C14.1167 1.97896 14.0981 1.95105 14.0747 1.92758C14.0512 1.90411 14.0233 1.88554 13.9926 1.87297C13.9618 1.8604 13.9289 1.85408 13.8957 1.85437C13.8625 1.85465 13.8297 1.86155 13.7992 1.87465C13.7687 1.88775 13.7411 1.9068 13.7181 1.93068L13.7149 1.93393L13.7149 1.9339L13.007 2.64078C12.96 2.68778 12.9336 2.75153 12.9336 2.818C12.9336 2.88447 12.96 2.94822 13.007 2.99522C13.054 3.04223 13.1178 3.06863 13.1843 3.06863C13.2507 3.06863 13.3144 3.04227 13.3614 2.99535L14.0715 2.28415ZM14.0715 2.28415L14.0684 2.28735L13.3615 2.99522L14.0715 2.28415ZM13.361 9.00425L13.3615 9.00478L14.0684 9.71172C14.0684 9.71174 14.0685 9.71176 14.0685 9.71178C14.0932 9.73654 14.1125 9.76622 14.125 9.7989C14.1287 9.80863 14.1318 9.81855 14.1343 9.82862C13.8016 9.50115 13.4075 9.23481 12.9711 9.04896C12.9976 9.00605 13.0365 8.97218 13.0827 8.9518C13.1289 8.93138 13.1803 8.92547 13.23 8.93483C13.2796 8.94419 13.3253 8.9684 13.361 9.00425ZM10.179 0.323223C10.2259 0.370107 10.2523 0.433695 10.2523 0.5V1.5C10.2523 1.5663 10.2259 1.62989 10.179 1.67678C10.1321 1.72366 10.0686 1.75 10.0023 1.75C9.93595 1.75 9.87236 1.72366 9.82548 1.67678C9.77859 1.62989 9.75225 1.5663 9.75225 1.5V0.5C9.75225 0.433696 9.77859 0.370107 9.82548 0.323223C9.87236 0.276339 9.93595 0.25 10.0023 0.25C10.0686 0.25 10.1321 0.276339 10.179 0.323223ZM6.11672 1.86665C6.1817 1.86609 6.24431 1.89084 6.29133 1.93563L6.99748 2.64078C6.99751 2.64081 6.99754 2.64084 6.99757 2.64087C7.0208 2.66412 7.03923 2.69172 7.05181 2.72209C7.0644 2.7525 7.07088 2.78509 7.07088 2.818C7.07088 2.85091 7.0644 2.8835 7.05181 2.91391C7.03921 2.94432 7.02075 2.97195 6.99748 2.99522C6.9742 3.0185 6.94657 3.03696 6.91616 3.04955C6.88576 3.06215 6.85317 3.06863 6.82025 3.06863C6.78734 3.06863 6.75475 3.06215 6.72434 3.04955C6.69393 3.03696 6.6663 3.0185 6.64303 2.99522L5.93788 2.28908C5.8931 2.24206 5.86834 2.17945 5.86891 2.11447C5.86948 2.04892 5.89577 1.98622 5.94212 1.93987C5.98847 1.89352 6.05117 1.86722 6.11672 1.86665ZM8.56259 4.27044C8.36589 4.43407 8.19891 4.62974 8.06846 4.84874C7.89486 4.81607 7.71844 4.79121 7.53969 4.7745C7.67538 4.50222 7.85566 4.25362 8.07379 4.03933C8.37245 3.74591 8.73416 3.52457 9.13135 3.39216C9.52853 3.25976 9.95071 3.21979 10.3657 3.27531C10.7807 3.33083 11.1775 3.48037 11.5259 3.71252C11.8743 3.94468 12.1651 4.25333 12.3762 4.61493C12.5872 4.97653 12.7129 5.38154 12.7436 5.79909C12.7743 6.21663 12.7093 6.63568 12.5536 7.0243C12.4397 7.30826 12.2796 7.5705 12.0804 7.80065C11.9965 7.64331 11.9055 7.49015 11.8078 7.34181C11.9597 7.1373 12.076 6.90807 12.1514 6.66373C12.2463 6.35631 12.2742 6.03212 12.2331 5.71303C12.192 5.39393 12.083 5.08735 11.9134 4.81397C11.7438 4.54058 11.5175 4.30676 11.2498 4.12826C10.9822 3.94976 10.6793 3.83074 10.3618 3.77922C10.0442 3.72771 9.71925 3.7449 9.40888 3.82964C9.09851 3.91438 8.80993 4.0647 8.56259 4.27044ZM14.3255 5.82322C14.3724 5.77634 14.4359 5.75 14.5023 5.75H15.5023C15.5686 5.75 15.6321 5.77634 15.679 5.82322C15.7259 5.87011 15.7523 5.9337 15.7523 6C15.7523 6.0663 15.7259 6.12989 15.679 6.17678C15.6321 6.22366 15.5686 6.25 15.5023 6.25H14.5023C14.4359 6.25 14.3724 6.22366 14.3255 6.17678C14.2786 6.12989 14.2523 6.0663 14.2523 6C14.2523 5.9337 14.2786 5.87011 14.3255 5.82322Z"
                    stroke="#707070"
                    strokeWidth="0.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="navBox">
            <button onClick={() => addDate(-1)}>←</button>
            <button onClick={() => addDate(1)}>→</button>
          </div>
        </div>
      </div>
      <DroppableList
        rerender={rerender}
        data={tasks}
        setData={setTasks}
        showTitle={false}
        deleteEventHandler={deleteEventHandler}
        hasEmptyString={"no tasks added this day..."}
        onClick={selectTaskHandler}
      />
      <Popup
        isFullscreen={false}
        shown={smallPopup}
        children={
          smallPopup ? (
            <div className="popupWrapper dateWrapper">
              <h1>SELECT DATE</h1>
              <Calendar onChange={setDate} value={date} />
              <button className="btn" onClick={() => setSmallPopup(false)}>
                DONE
              </button>
            </div>
          ) : (
            <></>
          )
        }
        closeEvent={() => setSmallPopup(false)}
      />
      <Popup
        isFullscreen={false}
        shown={refreshPopup}
        children={
          refreshPopup ? (
            <div className="popupWrapper center">
              <h1 className="title">R YOU SURE?</h1>
              <p>Action: REFRESH DAILY TASKS</p>
              <button
                className="btn delete"
                onClick={() => setRefreshPopup(false)}
              >
                NO
              </button>
              <button
                className="btn"
                onClick={() => {
                  const ntasks = loadNewDailyTask(date, dailies, true);
                  const nTaskCol = [
                    ...taskCol.filter((t: ITodoColumn) => t?.id !== tasks?.id),
                    ntasks,
                  ];
                  setTasks(ntasks);
                  setTaskCol(nTaskCol);
                  saveTasks(nTaskCol);
                  setRefreshPopup(false);
                }}
              >
                YES
              </button>
            </div>
          ) : (
            <></>
          )
        }
        closeEvent={() => ""}
      />
      <Popup
        isFullscreen={true}
        shown={popup}
        closeEvent={() => {
          setPopup(false);
        }}
        children={
          <>
            {popup && selectedTask ? (
              <ScreensEditTask
                task={selectedTask}
                taskIds={[]}
                deleteEventHandler={deleteEventHandler}
              />
            ) : (
              <></>
            )}
          </>
        }
        title="EDIT TASK"
      />
    </div>
  );
};
export default ScreensHome;
