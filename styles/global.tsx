import { Global, css } from '@emotion/react'
import { breakpoints, colors } from 'src/utils/theme'

const styles = css`
    body {
        color: ${colors.darkBlue1};
        max-width: 1200px;
        margin: 0 auto;
    }
    .xs-hidden {
        @media (max-width: ${breakpoints.xs}) {
            display: none;
        }
    }

    .xs-large-hidden {
        @media (max-width: ${breakpoints.xsMax}) {
            display: none;
        }
    }

    .primary-text {
        font-family: Montserrat-Bold;
        font-size: 16px;
        margin: 10px 0;
    }

    .secondary-text {
        font-size: 12px;
    }

    .secondary-text-bold {
        font-family: Montserrat-Bold;
        font-size: 12px;
    }

    .container-padding {
        padding: 15px;

        @media (max-width: ${breakpoints.xs}) {
            padding: 15px 5px;
        }
    }

    .pointer {
        cursor: pointer;
    }

    .display-flex {
        display: flex;
    }

    .margin-top {
        margin-top: 20px;
    }

    .play-pause-button {
        &:active {
            fill: ${colors.pink};
        }

        @media (hover: hover) {
            &:hover {
                color: ${colors.pink};
            }
        }
    }
`

const GlobalStyles = () => <Global styles={styles} />

export default GlobalStyles
