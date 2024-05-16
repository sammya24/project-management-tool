import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const TaskDetails = () => {
  console.log('TaskDetails rendered');
  const router = useRouter();
  const { taskId } = router.query;
  const [taskDetails, setTaskDetails] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`/api/projects/details?taskId=${taskId}`);
      setTaskDetails(response.data);
      setUpdatedStatus(response.data.status);
      fetchComments(); //fetch comments along with task details
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/projects/comments?taskId=${taskId}`);
      
      const commentsArray = response.data.comments;
  
      setComments(commentsArray);
      console.log(commentsArray);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleStatusChange = async () => {
    try {
      if (!taskId || !updatedStatus) {
        console.error('Task ID or updated status is undefined');
        return;
      }

      //send the updated status to the backend
      await axios.put(`/api/projects/updateStatus?taskId=${taskId}`, { status: updatedStatus });

      //refetch the task details and comments to update the UI
      fetchTaskDetails();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!taskId || !comment) {
        console.error('Task ID or comment is undefined');
        return;
      }

      //seend the comment to the backend
      await axios.post(`/api/projects/addComment?taskId=${taskId}`, { comment });

      //clear the comment input and fetch updated comments
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    if (taskId) {
      //initial fetch
      fetchTaskDetails();

      //set up interval to fetch task details and comments every 5 seconds
      const intervalId = setInterval(() => {
        fetchTaskDetails();
      }, 5000);

      //clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [taskId]);

  if (!taskDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p>Name: {taskDetails.description}</p>
      <p>Deadline: {new Date(taskDetails.deadline).toLocaleDateString()}</p>
      <p>Assigned To: {taskDetails.assignedTo}</p>
      <p>Status: {taskDetails.status}</p>

      <form>
        <label>
          Update Status:
          <select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="button" onClick={handleStatusChange}>
          Update Status
        </button>
      </form>

      <h3>Comments</h3>
      <ul>
  {comments.map((comment) => (
    <li key={comment._id}>{comment.text}</li>
  ))}
</ul>

      <form onSubmit={handleCommentSubmit}>
        <label>
          Leave a Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default TaskDetails;

