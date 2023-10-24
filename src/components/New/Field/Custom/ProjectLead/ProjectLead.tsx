import { Transition } from "@headlessui/react";
import { FC, useState } from "react";
import { cn } from "src/utils/cn";
import { FieldLabel } from "src/components/New/Field/Label";
import CheckLine from "src/icons/CheckLine";
import { debounce } from "lodash";
import { FieldProjectLeadItem } from "./ProjectLeadItem";
import { Combobox } from "src/components/New/Field/Combobox";
import { ConfirmationModal } from "src/components/New/Modal/ConfirmationModal";

type Lead = {
  avatarUrl: string;
  id: number;
  isRegistered: boolean;
  login: string;
};

export interface FieldProjectLeadProps {
  id: string;
  children: React.ReactElement | string;
  className?: string;
}

// export const FieldProjectLead: FC<FieldProjectLeadProps> = ({ className, children, id }) => {
export const FieldProjectLead = () => {
  const [query, setQuery] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead[]>([]);

  const [confirm, setConfirm] = useState({
    show: false,
    username: "",
  });

  const filteredLeads =
    query === ""
      ? leads
      : leads.filter(lead =>
          lead.login.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleQuery = debounce(async (query: string) => {
    try {
      const response = await fetch(`/api/v1/github/users?search=${query}`);

      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        setLeads([]);
        console.error(response);
      }
    } catch (e) {
      setLeads([]);
      console.error(e);
    }

    setQuery(query);
  }, 500);

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel id="test">Project leads</FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="relative sm:w-2/3">
          <Transition
            show={confirm.show}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className="absolute -top-2.5 right-0 origin-bottom -translate-y-full"
          >
            <ConfirmationModal
              title={`Remove ${confirm.username}?`}
              message={`${confirm.username} won’t be able to manage the project anymore.`}
              onClose={() => {
                setConfirm(prevState => ({ ...prevState, show: false }));
                setTimeout(() => {
                  setConfirm(prevState => ({ ...prevState, username: "" }));
                }, 100);
              }}
              onConfirm={() => {
                setConfirm(prevState => ({ ...prevState, show: false }));
                setSelected(selected.filter(lead => lead.login !== confirm.username));

                setTimeout(() => {
                  setConfirm(prevState => ({ ...prevState, username: "" }));
                }, 100);
              }}
            />
          </Transition>
          <Combobox
            items={filteredLeads}
            renderItem={({ item, selected }) => (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-spaceBlue-100" />
                  <span className="block flex-1 truncate">{item.login}</span>
                  {/* {item.isRegistered ? <Avatar src={onlydustLogo} alt="Onlydust user" size="3.5" /> : null} */}
                </div>
                {selected ? <CheckLine className="h-4 w-4" /> : null}
              </div>
            )}
            query={query}
            onQuery={handleQuery}
            selected={selected}
            onChange={setSelected}
            placeholder="Pick a contributor or type in Github handle"
            multiple
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {/* <FieldProjectLeadItem avatar={user?.picture ?? ""} isYou label={user?.name ?? ""} /> */}
          {selected.map(({ id, avatarUrl, login, isRegistered }) => {
            return (
              <FieldProjectLeadItem
                key={id}
                avatar={avatarUrl}
                label={login}
                onRemove={() => setConfirm({ show: true, username: login })}
              />
            );
          })}
        </div>
        {/* <FieldMessage>
          <span className="flex items-center gap-1">
            <InformationLine className="h-3 w-3" /> To remove a project lead, ask us using the feedback form in the
            header.
          </span>
        </FieldMessage> */}
      </div>
    </div>
  );
};
