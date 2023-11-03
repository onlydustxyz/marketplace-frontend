export namespace RewardBudgetUtils {
  export const getDollarEquivalent = ({ rate, amount }: { rate: number | undefined; amount: number }) => {
    if (!rate) {
      return undefined;
    }

    return Math.round(amount * rate * 100) / 100;
  };

  export const canRewards = ({ remaining, amount }: { remaining: number; amount: number }) => {
    if (!amount || amount <= 0) {
      return false;
    }

    if (!remaining || remaining <= 0) {
      return false;
    }

    if (remaining - amount < 0) {
      return false;
    }

    return true;
  };

  export const getDollarForLeftToSpend = ({
    remaining,
    selected,
  }: {
    remaining: number | undefined;
    selected: number | undefined;
  }) => {
    if (!selected || !remaining) {
      return undefined;
    }

    return Math.abs(remaining - selected);
  };

  export const getBudgetProgression = ({
    total,
    remaining,
    spending,
  }: {
    total: number;
    remaining: number;
    spending: number;
  }) => {
    const _t = (total || 0) > 0 ? total : 0;
    const _r = (remaining || 0) > 0 ? remaining : 0;
    const _s = (spending || 0) > 0 ? spending : 0;
    return {
      remaining: Math.floor(((_r - _s) / _t) * 100) || 0,
      spending: Math.floor((_s / _t) * 100) || 0,
    };
  };
}
