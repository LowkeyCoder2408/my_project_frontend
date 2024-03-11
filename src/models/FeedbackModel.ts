import FeedbackStatus from './FeedbackStatus';

class FeedbackModel {
  id: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
  feedbackStatus?: FeedbackStatus;
  sentTime?: Date;

  constructor(
    id: number,
    fullName: string,
    phoneNumber: string,
    email: string,
    message: string,
    feedbackStatus: FeedbackStatus,
    sentTime: Date,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.message = message;
    this.feedbackStatus = feedbackStatus;
    this.sentTime = sentTime;
  }
}

export default FeedbackModel;
