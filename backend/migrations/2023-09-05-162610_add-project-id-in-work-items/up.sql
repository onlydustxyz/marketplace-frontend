ALTER TABLE work_items
ADD COLUMN project_id UUID;


UPDATE work_items
SET
    project_id = b.project_id
from
    payment_requests p,
    budgets b
where
    p.id = work_items.payment_id
    and b.id = p.budget_id;


ALTER TABLE work_items
ALTER COLUMN project_id
SET NOT NULL;