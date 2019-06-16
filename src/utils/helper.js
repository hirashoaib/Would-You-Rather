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

