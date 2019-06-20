export function formatQuestion (question, author) {
    const { id, timestamp, optionOne, optionTwo } = question;

    return {
      authorName: author.name,
      id,
      timestamp,
      avatar: author.avatarURL,
      optionOne,
      optionTwo
    }
  }

export function voteCount(votes, question){
    let totalOptions = question.optionOne.votes.length + question.optionTwo.votes.length;
    return votes / totalOptions *100;
}