// @flow

import {
    isEpicDisplayable,
    defaultMaxViews,
} from 'common/modules/commercial/contributions-utilities';
import {
    displayControlEpicInAbTest,
    trackEpic,
} from 'common/modules/commercial/epic/epic-utils';
import { displayIframeEpic } from 'common/modules/commercial/epic/iframe-epic-utils';

const epicIframeTest: ABTest = {
    id: 'AcquisitionsEpicIframeTest',
    campaignId: 'epic_iframe_test',
    start: '2018-07-31',
    expiry: '2019-07-31',
    author: 'Joseph Smith',
    description:
        'Bootstrap the AB testing framework to display the Epic inside an iframe',
    successMeasure: 'AV2.0',
    idealOutcome:
        'Serving the Epic inside an iframe does not lead to a drop in revenue',
    audienceCriteria: 'All',
    audience: 1,
    audienceOffset: 0,
    canRun: isEpicDisplayable,
    variants: [
        {
            id: 'control',
            options: {
                maxViews: defaultMaxViews,
            },
            test: () => {
                displayControlEpicInAbTest({
                    // Name corresponds to test name hard coded in the tracking link in the epic:
                    // https://support.theguardian.com/epic/iframe-or-not/index.html
                    name: 'iframe_or_not',
                    variant: 'not_iframe',
                }).then(trackEpic);
            },
        },
        {
            id: 'optimize',
            options: {
                maxViews: defaultMaxViews,
            },
            test: () => {
                displayIframeEpic({
                    url:
                        'https://support.theguardian.com/epic/iframe-or-not/index.html',
                    sendFonts: false,
                }).then(trackEpic);
            },
        },
    ],
};

const acquisitionsEpicIframeTest: AcquisitionsABTest = (epicIframeTest: any);

export { acquisitionsEpicIframeTest };