/*
 * @jeftelabs/utils
 *
 * (c) Jeftelabs
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import colors from '@jeftelabs/colors'
import type { Colors } from '@jeftelabs/colors/types'

/**
 * Returns the colors instance based upon the environment.
 *
 * - The "raw" option returns the colors instance that prefix the color
 *   transformations as raw text
 * - The "silent" option returns the colors instance that performs no
 *   color transformations
 */
export function useColors(options: { raw?: boolean; silent?: boolean } = {}): Colors {
  if (options.raw) {
    return colors.raw()
  }

  if (options.silent) {
    return colors.silent()
  }

  return colors.ansi()
}
