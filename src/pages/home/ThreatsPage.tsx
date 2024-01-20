import { FC, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import InputField from "../../components/Search/Search";
import "./ThreatsPage.css";
import "../../components/ThreatCard/ThreatCard.css";
import { Threat, mockThreats } from "../../models/Threats";
import { Card } from "react-bootstrap";
import { Filter } from "../../components/Filter/Filter";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { api } from "../../api/index";
import {
  setLowPrice,
  setHighPrice,
  setSearchValue,
} from "../../store/filterSlice";
import { useDispatch } from "react-redux";
import { useThreatsFilter } from "../../hooks/useThreatsList";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Threats: FC = () => {
  const dispatch = useDispatch();
  const [threats, setThreats] = useState<Threat[]>([]);
  const [draftId, setDraftId] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { is_authenticated, resetUser } = useAuth();
  const { lowPrice, highPrice, searchValue } = useThreatsFilter();

  const handleSearch = async () => {
    setLoading(true);
    var draftId, threats;

    const response = await api.api.threatsList({
      query: searchValue,
      lowPrice,
      highPrice,
    });
    if (response.status !== 200) {
      draftId = 0;
      threats = mockThreats;
    }
    draftId = response.data.draftId ? response.data.draftId : 0;
    threats = response.data.threats;

    setThreats(threats);
    setDraftId(draftId);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [lowPrice, highPrice]);

  const setFilter = (minVal: number, maxVal: number) => {
    dispatch(setLowPrice(minVal));
    dispatch(setHighPrice(maxVal));
  };

  const handleClick = async () => {
    navigate(`/requests/${draftId}`);
  };

  return (
    <div>
      <div style={{ marginLeft: "10%", marginTop: "20px" }}>
        <Breadcrumbs pages={[]} />
      </div>
      <div className={`container ${loading && "containerLoading"}`}>
        {loading && (
          <div className="loadingBg">
            <Spinner animation="border" />
          </div>
        )}
        <div className="site-body">
          <div className="filter">
            <button
              style={{
                width: "200px",
                backgroundColor: "rgb(46, 44, 44, 0.6)",
                fontSize: "1.25em",
              }}
              className={`search-button ${draftId == 0 ? "" : "cart-button"}`}
              onClick={handleClick}
              disabled={draftId == 0}
            >
              К корзине
            </button>
            <Filter min={1000} max={100000} setFilter={setFilter} />
          </div>
          <div className="cards-with-search">
            <div style={{display: "flex"}}>
              <InputField
                value={searchValue}

                setValue={(value) => dispatch(setSearchValue(value))}
              />
              <button
                style={{
                  width: "20%",
                  backgroundColor: "rgb(46, 44, 44, 0.6)",
                  marginLeft: "3px",
                  fontSize: "1.25em",
                }}
                className={`search-button`}
                onClick={handleSearch}
              >
                Поиск
              </button>
            </div>
            {!threats.length && (
              <div>
                <h1>К сожалению, по вашему запросу ничего не найдено</h1>
              </div>
            )}
            <div className="cards-list">
              {threats.map((item) => (
                <Card className="card">
                  <Card.Body className="card__content">
                    <Link to={`/threats/${item.threatId}`}>
                      <h3 className="card__name">{item.name}</h3>
                    </Link>
                    <div className="card_description"> {item.summary}</div>
                    <h4 className="card_description"> от {item.price} руб</h4>
                    <button
                      style={{
                        width: "200px",
                        backgroundColor: "rgb(46, 44, 44, 0.6)",
                        fontSize: "1.25em",
                      }}
                      className={`search-button ${!is_authenticated ? "" : "cart-button"}`}
                      onClick={async () => {
                        const response = await api.api.threatsRequestCreate(
                          item.threatId
                        );

                        if (response.status === 403) {
                          resetUser();
                        }

                        handleSearch();
                      }}
                    >
                      Добавить в корзину
                    </button>
                  </Card.Body>
                  <Card.Img
                    className="card__image"
                    src={item.image}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "./public/default.jpeg";
                    }}
                  ></Card.Img>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threats;
