import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

// This is the scroll select option used in both the language select and word select pages

class Disclosure extends React.Component {
  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <Text />
        <Text style={styles.disclosureBold}>Eligibility</Text>
        <Text style={styles.disclosure}>
        In order to participate in our crowd-sourcing project, you must be over
        the age of 19 or have your parent or guardian consent to and supervise
        your participation in our crowd-sourcing project.
        </Text>
        <Text />
        <Text style={styles.disclosureBold}>
        Your Contributions and Release of Rights
        </Text>
        <Text style={styles.disclosure}>
        If you submit written text or recordings, you assure MIT Voice Net that
        you have written any text content yourself and that any recordings are
        of your own voice, and any images or other associated material are taken
         by you. You also assure MIT Voice Net that you have the right to submit
         any of the above material for use in a public project under the CC-0
        license and that none infringe on any third parties’ rights.
        </Text>
        <Text />
        <Text style={styles.disclosure}>
        By submitting your material, you also waive all copyrights and related
        rights that you may have in them, and you agree to release the material
        to the public under a CC-0 license. This means that you agree to waive
        all rights to the material worldwide under copyright and database law,
        including moral and publicity rights and all related and neighboring rights.
        </Text>
        <Text />
        <Text style={styles.disclosureBold}>General</Text>
        <Text style={styles.disclosure}>
          Disclaimer; Limitation of Liability: MIT VOICE NET AND ALL INCLUDED
          MATERIAL ARE PROVIDED ON AN “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND,
          WHETHER EXPRESS OR IMPLIED. MIT TAKES NO RESPONSIBILITY AND ASSUMES
          NO LIABILITY FOR ANY MATERIAL THAT YOU OR ANY OTHER USER OR THIRD PARTY
          POSTS OR TRANSMITS USING MIT VOICE NET. MIT SPECIFICALLY DISCLAIMS ANY
          AND ALL WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, AND	NON-INFRINGEMENT, AND ANY WARRANTIES
          ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
					TO THE EXTENT PERMITTED BY APPLICABLE LAW, YOU AGREE TO RELEASE AND
          HOLD HARMLESS MIT AND ITS RESPECTIVE PARENT, SUBSIDIARIES, AFFILIATES,
          DIRECTORS, OFFICERS, EMPLOYEES, AND AGENTS, FROM ANY AND ALL LIABILITY
          FOR ANY DAMAGE, LOSS OR DELAY (INCLUDING PERSONAL INJURY, DEATH, OR
          PROPERTY DAMAGE) RESULTING IN WHOLE OR IN PART, DIRECTLY OR INDIRECTLY,
          FROM YOUR PARTICIPATION IN MIT VOICE NET.
					EXCEPT AS REQUIRED BY LAW, MIT AND PARTIES WILL NOT BE LIABLE FOR ANY
          INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES
          ARISING OUT OF OR IN ANY WAY RELATING TO THESE TERMS OR THE USE OF OR
          INABILITY TO USE MIT VOICE NET, INCLUDING WITHOUT LIMITATION DIRECT AND
          INDIRECT DAMAGES FOR LOSS OF GOODWILL, WORK STOPPAGE, LOST PROFITS, LOSS
          OF DATA, AND COMPUTER FAILURE OR MALFUNCTION, EVEN IF ADVISED OF THE
          POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF THE THEORY (CONTRACT, TORT,
            OR OTHERWISE) UPON WHICH SUCH CLAIM IS BASED. THE COLLECTIVE LIABILITY
            OF MIT WAKE AND THE MIT PARTIES UNDER THIS AGREEMENT WILL NOT EXCEED
            $500 (FIVE HUNDRED DOLLARS). SOME JURISDICTIONS DO NOT ALLOW THE
            EXCLUSION OR LIMITATION OF INCIDENTAL, CONSEQUENTIAL, OR SPECIAL
            DAMAGES, SO THIS EXCLUSION AND LIMITATION MAY NOT APPLY TO YOU.
        </Text>
        <Text />
        <Text style={styles.disclosureBold}>Termination</Text>
        <Text style={styles.disclosure}>
        We may suspend or terminate your access to MIT Voice Net at any time for
         any reason. Regardless of any termination, all material that you submit
         to MIT Voice Net will continue to be publicly available.
        </Text>
        <Text />
        <Text style={styles.disclosureBold}>Governing Law</Text>
        <Text style={styles.disclosure}>
        These Legal Terms constitute the entire agreement between you and MIT
        concerning MIT Voice Net and are governed by the laws of the state of
        Massachusetts, U.S.A.
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  disclosure: {
    fontFamily: 'Montserrat',
    marginLeft: 20,
    marginRight: 20,
    color: '#52607a',

  },
  disclosureBold: {
    fontFamily: 'Montserrat',
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold',

  },
  scrollview: {
    margin: 20,
    marginTop: 20,
  },
});

export default Disclosure;
