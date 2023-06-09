import React, { ReactNode, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'antd';

import Footer from '../components/footer/Footer';
import SettingsForm from '../components/settings/SettingsForm';

import { updateSettings, resetSettings } from '../../redux/settings/actions';
import { fetchPatients } from '../../redux/patients/actions';
import { fetchAppointments } from '../../redux/appointments/actions';
import { fetchPayments } from '../../redux/payments/actions';
import { fetchInventories } from '../../redux/inventories/actions';

import className from '../../utils/class-names';

import { IAppSettings } from '../../interfaces/settings';
import { IAppState } from '../../interfaces/app-state';
import { IPageData } from '../../interfaces/page';

import './BaseLayout.scss';

const patientsUrl = 'http://localhost:7000/patients';
const appointmentsUrl = 'http://localhost:7000/appointments';
const paymentsUrl = 'http://localhost:7000/payments';
const inventoriesUrl = 'http://localhost:7000/inventories'

type Props = {
  nav: ReactNode;
  sideNav?: ReactNode;
  topNav?: ReactNode;
  children: ReactNode;
  orientation: 'vertical' | 'horizontal';
};

const BaseLayout = ({ nav, topNav, sideNav, orientation, children }: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();

  const sidebarOpened = useSelector<IAppState, boolean>((state) => state.settings.sidebarOpened);
  const settings = useSelector<IAppState, IAppSettings>((state) => state.settings);
  const pageData = useSelector<IAppState, IPageData>((state) => state.pageData);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [patientsUrl]);
  
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [appointmentsUrl]);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [paymentsUrl]);

  useEffect(() => {
    dispatch(fetchInventories());
  }, [inventoriesUrl]);

  const handleScroll = (event) => {
    setScrolled(event.target.scrollTop > 0);
  };

  const mainContentClasses = className({
    'main-content': true,
    loaded: pageData.loaded,
    fulfilled: pageData.fulFilled
  });

  const mainContentWrapClasses = className({
    'main-content-wrap': true
  });

  const onUpdateSettings = (settings) => dispatch(updateSettings(settings));
  const toggleSettings = () => setShowSettings(!showSettings);
  const onResetSettings = () => dispatch(resetSettings());

  const contentOverlay = (
    <div
      className={className({
        'content-overlay': true,
        show: sidebarOpened
      })}
    />
  );

  return (
    <div className={`layout ${orientation}`}>
      <div className={`app-container ${settings.boxed && 'boxed'} ${scrolled && 'scrolled'}`}>
        {nav}

        {topNav}

        {sideNav}

        <main onScroll={handleScroll} className={mainContentClasses}>
          <div className='app-loader'>
            <i className='icofont-spinner-alt-4 rotate' />
          </div>

          <div className={mainContentWrapClasses}>
            {pageData && !!pageData.title && (
              <header className='page-header'>
                <h1 className='page-title'>{pageData.title}</h1>
              </header>
            )}
            {children}
          </div>
        </main>

        <Footer
          breadcrumbs={pageData.breadcrumbs}
          layout={settings.layout}
          boxed={settings.boxed}
          loaded={pageData.loaded}
          openModal={toggleSettings}
        />
        {contentOverlay}
        <Modal
          visible={showSettings}
          onCancel={toggleSettings}
          footer={null}
          title={
            <h3 className='m-0' style={{ opacity: 0.8 }}>
              Settings
            </h3>
          }
        >
          <SettingsForm
            settings={settings}
            onResetSettings={onResetSettings}
            onUpdateSetting={onUpdateSettings}
          />
        </Modal>
      </div>
    </div>
  );
};

export default BaseLayout;
