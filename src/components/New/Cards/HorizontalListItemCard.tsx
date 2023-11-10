import React from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import PencilLine from "src/icons/PencilLine";

interface HorizontalListItemCardProps {
  imageUrl: string;
  title: string;
  linkUrl: string;
}

const HorizontalListItemCard: React.FC<HorizontalListItemCardProps> = ({ imageUrl = "", title = "", linkUrl = "" }) => {
  return (
    <Card className="shadow-medium" key={title}>
      <div className="flex items-center gap-3">
        <RoundedImage src={imageUrl} alt={title} rounding={Rounding.Corners} size={ImageSize.Md} />
        <li className="flex-1">{title}</li>
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly data-testid="action-button">
            <PencilLine />
          </Button>
        </a>
      </div>
    </Card>
  );
};

export default HorizontalListItemCard;
