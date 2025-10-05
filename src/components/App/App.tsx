import { useState } from "react";
import type { Votes, VotesType } from "../../types/votes";
import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VotesOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

export default function App() {
  let totalVotes = 0;
  let positiveVotes = 0;
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleVote(type: VotesType): void {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  }
  totalVotes = votes.good + votes.neutral + votes.bad;
  positiveVotes = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;
  function resetVotes(): void {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    totalVotes = 0;
    positiveVotes = 0;
  }

  return (
    <div className={css.app}>
      <CafeInfo />
      <VotesOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0 ? true : false}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveVotes={positiveVotes}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
