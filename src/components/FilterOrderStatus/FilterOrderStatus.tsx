import { FC, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Filter } from "../../pages/myRequests/MyRequestsPage";

type FilterByStatusProps = {
  state: Filter;
  handleFilterChange: (filter: Filter) => void;
};

const FilterOrderStatus: FC<FilterByStatusProps> = ({
  state,
  handleFilterChange,
}) => {
  const [filter, setFilter] = useState<Filter>(state);

  const handleChange = (event: any) => {
    const { value, checked } = event.target;
    var f: Filter = { Accepted: false, Canceled: false, Formated: false }
    if (value !== "All") {
      // @ts-ignore
      f[value as keyof Filter] = checked
    }
    setFilter(f);
  };

  useEffect(() => {
    handleFilterChange(filter);
  }, [filter, handleFilterChange]);

  return (
    <Container>
      <Row>
        <div
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "500",
            marginLeft: "260px",
          }}
        >
          Фильтр по статусу заявки
        </div>
        <form style={{ display: "flex", flexDirection: "row", marginLeft: "250px", }}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Accepted"
                name="name"
                defaultChecked={state.Accepted}

                onChange={handleChange}
              />
              принята
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Canceled"
                name="name"

                defaultChecked={state.Canceled}
                onChange={handleChange}
              />
              отклонена
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Formated"
                name="name"
                defaultChecked={state.Formated}

                onChange={handleChange}
              />
              сформирована
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="All"
                name="name"
                defaultChecked={!state.Accepted && !state.Canceled && !state.Formated}

                onChange={handleChange}
              />
              все
            </label>
          </div>
        </form>
      </Row>
    </Container>
  );
};

export default FilterOrderStatus;
