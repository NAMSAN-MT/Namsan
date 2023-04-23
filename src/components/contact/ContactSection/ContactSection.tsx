import { injectIntl } from 'gatsby-plugin-intl';
import React, { useEffect, useRef, useState } from 'react';
import Info from '../Info';
import Title from '../Title';
import { IContactSectionProps } from './ContactSection.interface';
import * as S from './ContactSection.style';

let isMapSet = false;

const ContactSection = ({ intl }: IContactSectionProps) => {
  const mapRef = useRef<HTMLElement>(null);
  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    interval.current = setInterval(() => {
      if (isMapSet) {
        clearInterval(interval.current);
        return;
      }

      const { naver } = window;
      if (!naver) return;

      isMapSet = true;
      const location = new naver.maps.LatLng(37.3595704, 127.105399);
      const mapOptions: naver.maps.MapOptions = {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      const map = new naver.maps.Map(mapRef.current!, mapOptions);
      new naver.maps.Marker({
        position: location,
        map,
      });
    }, 100);
  }, []);
  return (
    <S.ContentSectionWrapper>
      <div className="title">
        <Title title="CONTACT" />
      </div>
      <S.Map>
        <div className="map" ref={mapRef}></div>
      </S.Map>
      <Info.Wrapper>
        <Info.Column>
          <Info
            title={intl.formatMessage({ id: 'contact.title_address' })}
            content={intl.formatMessage({ id: 'contact.address' })}
          />
        </Info.Column>
        <Info.Column>
          <Info
            title={intl.formatMessage({ id: 'contact.title_email' })}
            content="namsan@namsanlaw.com"
          />
          <Info
            title={intl.formatMessage({ id: 'contact.title_tel' })}
            content="02-777-0550"
          />
          <Info
            title={intl.formatMessage({ id: 'contact.title_fax' })}
            content="02-754-0077"
          />
        </Info.Column>
      </Info.Wrapper>
    </S.ContentSectionWrapper>
  );
};

export default injectIntl(ContactSection);
