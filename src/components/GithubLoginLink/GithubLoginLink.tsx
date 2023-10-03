import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";

export function GithubLoginLink({ author }: { author: { id: number; login: string; avatarUrl: string } }) {
  return (
    <div className="inline-flex gap-1 text-xs text-spacePurple-300 hover:text-spacePurple-200">
      <span>{author.login}</span>
      <RoundedImage src={author.avatarUrl} alt={author.login} rounding={Rounding.Circle} size={ImageSize.Xxs} />
    </div>
  );
}
